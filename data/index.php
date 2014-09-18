<?php


// data retrieval functions
require 'retrieval.php';


// Predis library
require 'predis/Autoloader.php';
Predis\Autoloader::register();


/*
 * Redis connection
 */
$redis_server = array(
    'host'     => '127.0.0.1',
    'port'     => 6380,
    'database' => 0
);

// db connection
$db = new Predis\Client($redis_server);


/*
 * if data is stored, print db data to user
 */
if($db->get('movieGroups'))
{
    // return data string from db
    $json = $db->get('movieGroups');
    print_r($json);
}


/*
 * Retrieve data from api
 */
if($_REQUEST['download'] == 'secret')
{
    // get movies from api
    $movies = getSfMovies('http://data.sfgov.org/resource/yitu-d5am.json');

    // get geo info for movie locations
    $movies = geocode($movies);

    // add data to database for quicker access and long term storage
    $db->set('movieGroups', json_encode($movies));

    // return json to client
    print_r($db->get('movieGroups'));
}


?>
