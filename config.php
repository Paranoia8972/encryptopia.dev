<?php
// Start session
if(!session_id()){
    session_start();
}

// Database configuration
define('DB_HOST', 'IP-Adress-here');
define('DB_USERNAME', 'DB-Username-here');
define('DB_PASSWORD', 'DB-password-here');
define('DB_NAME', 'DB-name-here');
define('DB_USER_TBL', 'DB-table-name-here'); 

// GitHub API configuration 
define('CLIENT_ID', 'GitHub-Client-ID-here'); 
define('CLIENT_SECRET', 'GitHub-Client-Secrete-here'); 
define('REDIRECT_URL', 'https://encryptopia.dev/'); 

// Start session 
if(!session_id()){ 
    session_start(); 
} 

// Include Github client library
require_once 'src/Github_OAuth_Client.php'; 

// Initialize Github OAuth client class 
$gitClient = new Github_OAuth_Client(array( 
    'client_id' => CLIENT_ID, 
    'client_secret' => CLIENT_SECRET, 
    'redirect_uri' => REDIRECT_URL 
)); 

// Try to get the access token 
if(isset($_SESSION['access_token'])){ 
    $accessToken = $_SESSION['access_token']; 
}
?>
