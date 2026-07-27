<?php
/**
 * news-share.php — Article delivery + social-crawler Open Graph tags.
 *
 * .htaccess routes ALL /news/article/ requests here. This script then:
 *   - Humans      -> streams the real static app (news/article/index.html)
 *                    unchanged, so the page renders exactly as before.
 *   - Social bots -> returns a lightweight page carrying real
 *                    og:title/description/image fetched from Supabase.
 *
 * There is NO HTTP redirect anywhere, so a redirect loop is impossible even
 * if the host ignores user-agent rules. The anon key below is the same public,
 * read-only key already shipped in the browser JS bundle (protected by RLS).
 */

$SUPABASE_URL  = 'https://utphofcqgzyzbxpkwnmj.supabase.co';
$SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cGhvZmNxZ3p5emJ4cGt3bm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0OTQyMDIsImV4cCI6MjA4ODA3MDIwMn0.fyGgiHL7HbzIFTkFnQ-8RZXt3_toUNg9y144vQdRHjI';
$SITE_NAME     = 'الاتحاد الرياضي ببنقردان';

$ua = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
$isBot = preg_match(
    '/(facebookexternalhit|Facebot|Twitterbot|WhatsApp|LinkedInBot|Slackbot|TelegramBot|Telegram|Discordbot|Pinterest|redditbot|Applebot|vkShare|SkypeUriPreview|Skype|Googlebot|bingbot|Embedly|Iframely|Google-InspectionTool|MetaInspector)/i',
    $ua
);

$appFile = $_SERVER['DOCUMENT_ROOT'] . '/news/article/index.html';

/* ---------- Human path: serve the real app unchanged (no redirect) ---------- */
if (!$isBot && is_readable($appFile)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($appFile);
    exit;
}

/* ---------- Bot path (and human fallback): build Open Graph tags ---------- */
$host   = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'usbenguerdane.tn';
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$origin = $scheme . '://' . $host;
$slug   = isset($_GET['slug']) ? trim($_GET['slug']) : '';

$title       = 'أخبار الاتحاد الرياضي ببنقردان';
$description = 'فرسان الحدود — 90 عامًا من المجد';
$image       = $origin . '/brand/logo.png';
$canonical   = $origin . '/news/article/?slug=' . rawurlencode($slug);

if ($slug !== '') {
    $endpoint = $SUPABASE_URL . '/rest/v1/articles'
        . '?slug=eq.' . rawurlencode($slug)
        . '&select=title_ar,excerpt_ar,image&limit=1';

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
            if (!empty($a['title_ar']))   $title       = $a['title_ar'];
            if (!empty($a['excerpt_ar'])) $description = $a['excerpt_ar'];
            if (!empty($a['image']))      $image       = $a['image'];
        }
    }
}

function e($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
header('Content-Type: text/html; charset=utf-8');
?>
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($title) ?></title>
<meta name="description" content="<?= e($description) ?>">

<meta property="og:type" content="article">
<meta property="og:site_name" content="<?= e($SITE_NAME) ?>">
<meta property="og:locale" content="ar_AR">
<meta property="og:title" content="<?= e($title) ?>">
<meta property="og:description" content="<?= e($description) ?>">
<meta property="og:image" content="<?= e($image) ?>">
<meta property="og:url" content="<?= e($canonical) ?>">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= e($title) ?>">
<meta name="twitter:description" content="<?= e($description) ?>">
<meta name="twitter:image" content="<?= e($image) ?>">

<link rel="canonical" href="<?= e($canonical) ?>">
</head>
<body style="background:#0b0b0b;color:#fff;font-family:sans-serif;text-align:center;padding:40px">
<h1 style="color:#F7C600"><?= e($title) ?></h1>
<p><?= e($description) ?></p>
<p><a style="color:#F7C600" href="<?= e($canonical) ?>">اقرأ المقال كاملاً ←</a></p>
</body>
</html>
