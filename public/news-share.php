<?php
/**
 * news-share.php — Serves the real article page to everyone, with the article's
 * Open Graph tags injected into <head> so social crawlers show a rich preview.
 *
 * .htaccess routes every /news/article/ request here. We read the real static
 * app file (via __DIR__, which is this site's root regardless of DOCUMENT_ROOT),
 * inject og:/twitter: tags fetched from Supabase, and stream it. Humans get the
 * full working app; bots (no JS) read the tags. No redirect -> no loop.
 *
 * The anon key is the same public, read-only key already in the browser bundle.
 */

$SUPABASE_URL  = 'https://utphofcqgzyzbxpkwnmj.supabase.co';
$SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cGhvZmNxZ3p5emJ4cGt3bm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0OTQyMDIsImV4cCI6MjA4ODA3MDIwMn0.fyGgiHL7HbzIFTkFnQ-8RZXt3_toUNg9y144vQdRHjI';
$SITE_NAME     = 'الاتحاد الرياضي ببنقردان';

$host   = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'usbenguerdane.tn';
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$origin = $scheme . '://' . $host;
$slug   = isset($_GET['slug']) ? trim($_GET['slug']) : '';

/* ---------- Defaults (used if no slug / not found) ---------- */
$title       = 'أخبار الاتحاد الرياضي ببنقردان';
$description = 'فرسان الحدود — 90 عامًا من المجد';
$image       = $origin . '/brand/logo.png';
$canonical   = $origin . '/news/article/?slug=' . rawurlencode($slug);

/* ---------- Fetch the article from Supabase ---------- */
if ($slug !== '') {
    $endpoint = $SUPABASE_URL . '/rest/v1/articles'
        . '?slug=eq.' . rawurlencode($slug)
        . '&select=title_ar,excerpt_ar,content_ar,image&limit=1';

    $body = false;

    if (function_exists('curl_init')) {
        $ch = curl_init($endpoint);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 6,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_HTTPHEADER     => [
                'apikey: ' . $SUPABASE_ANON,
                'Authorization: Bearer ' . $SUPABASE_ANON,
                'Accept: application/json',
            ],
        ]);
        $body = curl_exec($ch);
        curl_close($ch);
    }

    if ($body === false && ini_get('allow_url_fopen')) {
        $ctx = stream_context_create(['http' => ['method' => 'GET', 'timeout' => 6,
            'header' => "apikey: {$SUPABASE_ANON}\r\nAuthorization: Bearer {$SUPABASE_ANON}\r\nAccept: application/json\r\n"]]);
        $body = @file_get_contents($endpoint, false, $ctx);
    }

    if ($body !== false) {
        $rows = json_decode($body, true);
        if (is_array($rows) && count($rows) > 0) {
            $a = $rows[0];
            if (!empty($a['title_ar'])) $title = $a['title_ar'];
            if (!empty($a['image']))    $image = $a['image'];

            if (!empty($a['excerpt_ar'])) {
                $description = $a['excerpt_ar'];
            } elseif (!empty($a['content_ar'])) {
                // No excerpt: derive a clean snippet from the article body.
                $plain = trim(preg_replace('/\s+/u', ' ', strip_tags($a['content_ar'])));
                if ($plain !== '') {
                    $description = mb_substr($plain, 0, 180, 'UTF-8');
                    if (mb_strlen($plain, 'UTF-8') > 180) $description .= '…';
                }
            }
        }
    }
}

function e($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

/* ---------- Build the Open Graph block ---------- */
$og = "\n"
    . '<meta property="og:type" content="article">' . "\n"
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

/* ---------- Serve the real app with tags injected ---------- */
$appFile = __DIR__ . '/news/article/index.html';
$html = @file_get_contents($appFile);

if ($html !== false && stripos($html, '</head>') !== false) {
    // Give bots an article-specific <title>, then inject the OG block.
    $html = preg_replace('/<title>.*?<\/title>/is', '<title>' . e($title) . '</title>', $html, 1);
    $pos  = stripos($html, '</head>');
    $html = substr($html, 0, $pos) . $og . substr($html, $pos);

    header('Content-Type: text/html; charset=utf-8');
    echo $html;
    exit;
}

/* ---------- Fallback: minimal preview page if the app file is unreadable ---------- */
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
<p><a style="color:#F7C600" href="<?= e($canonical) ?>">اقرأ المقال كاملاً ←</a></p>
</body>
</html>
