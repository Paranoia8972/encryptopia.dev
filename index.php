<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        
        <link rel="preload" href="https://encryptopia.dev/media/font.woff2" as="font" crossorigin="" type="font/woff2"/>
        <link rel="preload" href="https://encryptopia.dev/img/icon.png" as="image" crossorigin="" type="image/png"/>
    
        <link rel="stylesheet" href="styles.css" crossorigin="" data-precedence="next"/>
        
        <title>Encryptopia.dev</title>
        
        <meta name="description" content="Explore the world of encryption and cybersecurity. Dive into of Raspberry Pis, and ethical hacking."/>
        <link rel="icon" href="https://encryptopia.dev/favicon.ico" type="image/x-icon" sizes="16x16"/>
        <meta name="next-size-adjust"/>
    
        <meta property="og:title" content="Encryptopia.dev">
        <meta property="og:description" content="">
        <meta property="og:image" content="https://encryptopia.dev/img/image.png">
        <meta property="og:url" content="https://encryptopia.dev/">
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

        <link rel="apple-touch-icon" sizes="57x57" href="https://encryptopia.dev/ico/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="https://encryptopia.dev/ico/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="https://encryptopia.dev/ico/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="https://encryptopia.dev/ico/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="https://encryptopia.dev/ico/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="https://encryptopia.dev/ico/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="https://encryptopia.dev/ico/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="https://encryptopia.dev/ico/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="https://encryptopia.dev/ico/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="https://encryptopia.dev/ico/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="https://encryptopia.dev/ico/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="https://encryptopia.dev/ico/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="https://encryptopia.dev/ico/favicon-16x16.png">

    </head>
    <!-- Login with GitHub -->
    <?php 
                    // Include configuration file 
                    require_once 'config.php'; 
 
                    // Include and initialize user class 
                    require_once 'User.class.php'; 
                    $user = new User();
                    
                    if(isset($accessToken)){ 
                        // Get the user profile data from Github 
                        $gitUser = $gitClient->getAuthenticatedUser($accessToken); 
                         
                        if(!empty($gitUser)){ 
                            // Getting user profile details 
                            $gitUserData = array(); 
                            $gitUserData['oauth_uid'] = !empty($gitUser->id)?$gitUser->id:''; 
                            $gitUserData['name'] = !empty($gitUser->name)?$gitUser->name:''; 
                            $gitUserData['username'] = !empty($gitUser->login)?$gitUser->login:''; 
                            $gitUserData['email'] = !empty($gitUser->email)?$gitUser->email:''; 
                            $gitUserData['location'] = !empty($gitUser->location)?$gitUser->location:''; 
                            $gitUserData['picture'] = !empty($gitUser->avatar_url)?$gitUser->avatar_url:''; 
                            $gitUserData['link'] = !empty($gitUser->html_url)?$gitUser->html_url:''; 
                             
                            // Insert or update user data to the database 
                            $gitUserData['oauth_provider'] = 'github'; 
                            $userData = $user->checkUser($gitUserData); 
                     
                            // Storing user data in the session 
                            $_SESSION['userData'] = $userData; 
                     
                            // Render Github profile data 
                            $output     = '<h2>GitHub Account Details</h2>'; 
                            $output .= '<div class="ac-data">'; 
                            $output .= '<img src="'.$userData['picture'].'">'; 
                            $output .= '<p><b>ID:</b> '.$userData['oauth_uid'].'</p>'; 
                            $output .= '<p><b>Name:</b> '.$userData['name'].'</p>'; 
                            $output .= '<p><b>Login Username:</b> '.$userData['username'].'</p>'; 
                            $output .= '<p><b>Email:</b> '.$userData['email'].'</p>'; 
                            $output .= '<p><b>Location:</b> '.$userData['location'].'</p>'; 
                            $output .= '<p><b>Profile Link:</b> <a href="'.$userData['link'].'" target="_blank">Click to visit GitHub page</a></p>'; 
                            $output .= '<p>Logout from <a href="logout.php">GitHub</a></p>'; 
                            $output .= '</div>'; 
                        }else{ 
                            $output = '<h3 style="color:red">Something went wrong, please try again!</h3>'; 
                        }  
                    }elseif(isset($_GET['code'])){ 
                        // Verify the state matches the stored state 
                        if(!$_GET['state'] || $_SESSION['state'] != $_GET['state']) { 
                            header("Location: ".$_SERVER['PHP_SELF']); 
                        } 
                         
                        // Exchange the auth code for a token 
                        $accessToken = $gitClient->getAccessToken($_GET['state'], $_GET['code']); 
                       
                        $_SESSION['access_token'] = $accessToken; 
                       
                        header('Location: ./'); 
                    }else{ 
                        // Generate a random hash and store in the session for security 
                        $_SESSION['state'] = hash('sha256', microtime(TRUE) . rand() . $_SERVER['REMOTE_ADDR']); 
                         
                        // Remove access token from the session 
                        unset($_SESSION['access_token']); 
   
                        // Get the URL to authorize 
                        $authUrl = $gitClient->getAuthorizeURL($_SESSION['state']); 
                    } 
                    ?>

<!-- Login with GitHub End -->

            <main class="flex min-h-screen flex-col items-center justify-between p-24">
                <div class="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                    <?php
                        if(isset($_SESSION['userData'])) {
                            $username = $_SESSION['userData']['username'];
                            $picture = $_SESSION['userData']['picture'];
                            echo "<p class='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
                            Hiya,<code class='font-mono font-bold'>&thinsp;$username</code>!&nbsp<a href='/logout.php'><u>Logout?</u><a/>
                            </p>";
                        } else {
                            echo "<a href='$authUrl' class='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>Login with&nbsp<u>Github</u></a>";
                        }
                    ?>
                <div class="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a class="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0" href="https://encryptopia.dev/"rel="noopener noreferrer">
                        <img alt="Paranoia8972" fetchPriority="high" width="35" h-auto src="/img/icon.png"/>
                        By Paranoia8972
                    </a>
                </div>
            </div>
            <div class="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[&#x27;&#x27;] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[&#x27;&#x27;] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <p class="title">Encryptopia</p>
            </div>
            <div class="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <a href="/pages/projects" class="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" rel="noopener noreferrer">
                    <h2 class="mb-3 text-2xl font-semibold">
                        Projects
                        <!-- -->
                        <span class="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
                    </h2>
                    <p class="m-0 max-w-[30ch] text-sm opacity-50">Find all about my projects and things I made.</p>
                </a>
                <a href="/pages/docs" class="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" rel="noopener noreferrer">
                    <h2 class="mb-3 text-2xl font-semibold">
                        Docs
                        <!-- -->
                        <span class="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
                    </h2>
                    <p class="m-0 max-w-[30ch] text-sm opacity-50">View my GitHub and learn about my projects.</p>
                </a>
                <a href="/pages/minecraft" class="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" rel="noopener noreferrer">
                    <h2 class="mb-3 text-2xl font-semibold">
                        Minecraft
                        <!-- -->
                        <span class="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
                    </h2>
                    <p class="m-0 max-w-[30ch] text-sm opacity-50">Join the OnThePixel.net Minecraft server made by @TinyBrickBoy and me.</p>
                </a>
                <a href="/pages/blog" class="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" rel="noopener noreferrer">
                    <h2 class="mb-3 text-2xl font-semibold">
                        Blog
                        <!-- -->
                        <span class="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
                    </h2>
                    <p class="m-0 max-w-[30ch] text-sm opacity-50">Take a look at the Projects I write about.</p>
                </a>
            </div>
        </main>
        <footer class="footer">
    <div class="footer-container">
        <div class="footer-col">
            <h4>About the Website</h4>
            <p>Your website description here.</p>
        </div>
        <div class="footer-col">
            <h4>Links</h4>
            <ul>
                <li><a href="impressum"><i class="bi bi-github"></i>Impressum</a></li>
                <li><a href="https://github.com/paranoia8972"><i class="bi bi-bootstrap"></i>GitHub</a></li>
                <!-- Add more links as needed -->
            </ul>
        </div>
        <div class="footer-col">
            <h4>Copyright</h4>
            <p>© 2022 Your Name</p>
        </div>
    </div>
</footer>
  <script defer type="text/javascript" src="https://api.pirsch.io/pirsch-extended.js"
    id="pirschextendedjs"
    data-code="BlRomq2MUMaw7xDvX8jXNSKjrUThecwY"></script>
    </body>
</html>
