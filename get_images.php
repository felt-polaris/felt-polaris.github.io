<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$imageDir = 'image/';
$images = [];

if (is_dir($imageDir)) {
    $files = scandir($imageDir);
    $imageFiles = [];
    
    foreach ($files as $file) {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
            $filePath = $imageDir . $file;
            $imageFiles[] = [
                'name' => $file,
                'time' => filemtime($filePath)
            ];
        }
    }
    
    // 新しいファイルが先頭に来るように、更新時刻で降順ソート
    usort($imageFiles, function($a, $b) {
        return $b['time'] - $a['time'];
    });
    
    // ファイル名のみを配列に格納
    foreach ($imageFiles as $file) {
        $images[] = $file['name'];
    }
}

echo json_encode($images);
?>
