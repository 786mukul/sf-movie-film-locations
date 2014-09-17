<?php

// data retrieval functions
require 'retrieval.php';


// Predis library
require 'predis/Autoloader.php';
Predis\Autoloader::register();

// redis connection settings
$redis_server = array(
    'host'     => '127.0.0.1',
    'port'     => 6380,
    'database' => 0
);

// connect to redis db
$db = new Predis\Client ( $redis_server );


// if data is stored, print to user
if($db->get('movieGroups'))
{
    // return data string from db
    $json = $db->get('movieGroups');
    print_r($json);
}

// no data stored in db, retrieve data from api
else
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
