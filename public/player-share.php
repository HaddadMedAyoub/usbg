<?php
/**
 * player-share.php — Social-preview prerender for player pages.
 * Mirrors news-share.php: serves the real app to everyone with the player's
 * Open Graph tags injected into <head>. No redirect -> no loop.
 */

$SUPABASE_URL  = 'https://utphofcqgzyzbxpkwnmj.supabase.co';
$SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cGhvZmNxZ3p5emJ4cGt3bm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0OTQyMDIsImV4cCI6MjA4ODA3MDIwMn0.fyGgiHL7HbzIFTkFnQ-8RZXt3_toUNg9y144vQdRHjI';
$SITE_NAME     = 'الاتحاد الرياضي ببنقردان';

$host   = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'usbenguerdane.tn';
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$origin = $scheme . '://' . $host;
$slug   = isset($_GET['slug']) ? trim($_GET['slug']) : '';

$title       = 'لاعبو الاتحاد الرياضي ببنقردان';
$description = 'فرسان الحدود — تشكيلة الفريق';
$image       = $origin . '/brand/logo.png';
$canonical   = $origin . '/team/player/?slug=' . rawurlencode($slug);

$posMap = ['GK' => 'حارس مرمى', 'DEF' => 'مدافع', 'MID' => 'لاعب وسط', 'FWD' => 'مهاجم'];

if ($slug !== '') {
    $endpoint = $SUPABASE_URL . '/rest/v1/players'
        . '?slug=eq.' . rawurlencode($slug)
        . '&select=name_ar,photo,position,number,nationality,bio_ar&limit=1';

    $body = false;
    if (function_exists('curl_init')) {
        $ch = curl_init($endpoint);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 6,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_HTTPHEADER     => ['apikey: ' . $SUPABASE_ANON, 'Authorization: Bearer ' . $SUPABASE_ANON, 'Accept: application/json'],
        ]);
        $body = curl_exec($ch);
        curl_close($ch);
    }
    if ($body === false && ini_get('allow_url_fopen')) {
        $ctx = stream_context_create(['http' => ['timeout' => 6,
            'header' => "apikey: {$SUPABASE_ANON}\r\nAuthorization: Bearer {$SUPABASE_ANON}\r\nAccept: application/json\r\n"]]);
        $body = @file_get_contents($endpoint, false, $ctx);
    }

    if ($body !== false) {
        $rows = json_decode($body, true);
        if (is_array($rows) && count($rows) > 0) {
            $a = $rows[0];
            if (!empty($a['name_ar'])) $title = $a['name_ar'];
            if (!empty($a['photo']))   $image = $a['photo'];

            if (!empty($a['bio_ar'])) {
                $plain = trim(preg_replace('/\s+/u', ' ', strip_tags($a['bio_ar'])));
                $description = mb_substr($plain, 0, 180, 'UTF-8') . (mb_strlen($plain, 'UTF-8') > 180 ? '…' : '');
            } else {
                $parts = [];
                if (!empty($a['position']) && isset($posMap[$a['position']])) $parts[] = $posMap[$a['position']];
                if (isset($a['number']) && $a['number'] !== null && $a['number'] !== '') $parts[] = 'رقم ' . $a['number'];
                if (!empty($a['nationality'])) $parts[] = $a['nationality'];
                $description = 'لاعب الاتحاد الرياضي ببنقردان' . (count($parts) ? ' — ' . implode(' · ', $parts) : '');
            }
        }
    }
}

function e($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

$og = "\n"
    . '<meta property="og:type" content="profile">' . "\n"
    . '<meta property="og:site_name" content="' . e($SITE_NAME) . '">' . "\n"
    . '<meta property="og:locale" content="ar_AR">' . "\n"
    . '<meta property="og:title" content="' . e($title) . '">' . "\n"
    . '<meta property="og:description" content="' . e($description) . '">' . "\n"
    . '<meta property="og:image" content="' . e($image) . '">' . "\n"
    . '<meta property="og:url" content="' . e($canonical) . '">' . "\n"
    . '<meta name="twitter:card" content="summary_large_image">' . "\n"
    . '<meta name="twitter:title" content="' . e($title) . '">' . "\n"
    . '<meta name="twitter:description" content="' . e($description) . '">' . "\n"
    . '<meta name="twitter:image" content="' . e($image) . '">' . "\n";

$appFile = __DIR__ . '/team/player/index.html';
$html = @file_get_contents($appFile);

if ($html !== false && stripos($html, '</head>') !== false) {
    $html = preg_replace('/<title>.*?<\/title>/is', '<title>' . e($title) . '</title>', $html, 1);
    $pos  = stripos($html, '</head>');
    $html = substr($html, 0, $pos) . $og . substr($html, $pos);
    header('Content-Type: text/html; charset=utf-8');
    echo $html;
    exit;
}

header('Content-Type: text/html; charset=utf-8');
?>
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title><?= e($title) ?></title>
<meta name="description" content="<?= e($description) ?>">
<?= $og ?>
<link rel="canonical" href="<?= e($canonical) ?>">
</head>
<body style="background:#0b0b0b;color:#fff;font-family:sans-serif;text-align:center;padding:40px">
<h1 style="color:#F7C600"><?= e($title) ?></h1>
<p><?= e($description) ?></p>
<p><a style="color:#F7C600" href="<?= e($canonical) ?>">عرض اللاعب ←</a></p>
</body>
</html>
