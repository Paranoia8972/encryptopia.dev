<?php 
class Github_OAuth_Client{ 
    public $authorizeURL = "https://github.com/login/oauth/authorize"; 
    public $tokenURL = "https://github.com/login/oauth/access_token"; 
    public $apiURLBase = "https://api.github.com"; 
    public $clientID; 
    public $clientSecret; 
    public $redirectUri; 
     
    /** 
     * Construct object 
     */ 
    public function __construct(array $config = []){ 
        $this->clientID = isset($config['client_id']) ? $config['client_id'] : ''; 
        if(!$this->clientID){ 
            die('Required "client_id" key not supplied in config'); 
        } 
         
        $this->clientSecret = isset($config['client_secret']) ? $config['client_secret'] : ''; 
        if(!$this->clientSecret){ 
            die('Required "client_secret" key not supplied in config'); 
        } 
         
        $this->redirectUri = isset($config['redirect_uri']) ? $config['redirect_uri'] : ''; 
    } 
     
    /** 
     * Get the authorize URL 
     * 
     * @returns a string 
     */ 
    public function getAuthorizeURL($state){ 
        return $this->authorizeURL . '?' . http_build_query([ 
            'client_id' => $this->clientID, 
            'redirect_uri' => $this->redirectUri, 
            'state' => $state, 
            'scope' => 'user:email' 
        ]); 
    } 
     
    /** 
     * Exchange token and code for an access token 
     */ 
    public function getAccessToken($state, $oauth_code){ 
        $token = self::apiRequest($this->tokenURL . '?' . http_build_query([ 
            'client_id' => $this->clientID, 
            'client_secret' => $this->clientSecret, 
            'state' => $state, 
            'code' => $oauth_code 
        ])); 
        return $token->access_token; 
    } 
     
    /** 
     * Make an API request 
     * 
     * return API results 
     */ 
    public function apiRequest($access_token_url){ 
        $apiURL = filter_var($access_token_url, FILTER_VALIDATE_URL)?$access_token_url:$this->apiURLBase.'user?access_token='.$access_token_url; 
        $context  = stream_context_create([ 
          'http' => [ 
            'user_agent' => 'CodexWorld GitHub OAuth Login', 
            'header' => 'Accept: application/json' 
          ] 
        ]); 
        $response = file_get_contents($apiURL, false, $context); 
         
        return $response ? json_decode($response) : $response; 
    } 
 
    /** 
     * Get the authenticated user 
     * 
     * @returns object 
     */ 
    public function getAuthenticatedUser($access_token) { 
        $apiURL = $this->apiURLBase . '/user'; 
         
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL, $apiURL); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);  
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: token '. $access_token)); 
        curl_setopt($ch, CURLOPT_USERAGENT, 'CodexWorld GitHub OAuth Login'); 
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET'); 
        $api_response = curl_exec($ch); 
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);          
          
        if($http_code != 200){ 
            if (curl_errno($ch)) {  
                $error_msg = curl_error($ch);  
            }else{ 
                $error_msg = $api_response; 
            } 
            throw new Exception('Error '.$http_code.': '.$error_msg); 
        }else{ 
            return json_decode($api_response); 
        } 
    } 
}