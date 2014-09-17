<?php


/*
 * Get API data from link 
 */
function getSfMovies($api)
{

    // all movies object response from api
    $movies = json_decode(file_get_contents($api));

    // create movie groups array to use for movie grouping 
    $movieGroups = Array();

    /*
     * Group movies into single movie objects 
     */
    for($i = 0; $i < count($movies); $i++)
    {
        // get title to pass to object
        $title = $movies[$i]->title;
        $link = strtolower(str_replace(' ', '-', $title));

        // add link to movie object
        $movies[$i]->link = $link;

        // get location string
        $loc = $movies[$i]->locations;

        // convert locations to array
        $movies[$i]->locations = [];

        // if: movie object doesn't exist in groups, make new movie object
        if(!$movieGroups[$link])
        {
            // append loc to movie
            $loc = ['title' => $loc, 'lat' => '', 'lng' => ''];
            array_push($movies[$i]->locations, $loc);

            // add movie to movieGroups
            $movieGroups[$link] = $movies[$i];
        }

        // else: movie object exists within movieGroups, add location to locations array
        else
        {
            // append loc to movie
            $loc = ['title' => $loc, 'lat' => '', 'lng' => ''];
            array_push($movieGroups[$link]->locations, $loc);
        }
    }

    // return grouped movies
    return $movieGroups;
}




/*
 * Convert address to useable address 
 */
function fullAddress($loc)
{
    // string to append to location
    $sfAddress = ', San Francisco, CA, USA';

    // expand address shortcodes
    $loc = str_replace('St.', 'Street', $loc);
    $loc = str_replace(' St ', ' Street', $loc);
    $loc = str_replace('Dr.', 'Drive', $loc);
    $loc = str_replace(' Dr ', ' Drive', $loc);
    $loc = str_replace('Ave.', 'Avenue', $loc);
    $loc = str_replace(' Ave ', ' Avenue', $loc);
    $loc = str_replace('Blvd.', 'Boulevard', $loc);
    $loc = str_replace(' Blvd ', ' Boulevard', $loc);

    // string passed in parenthesis
    preg_match('#\((.*?)\)#', $loc, $match);
    $pstring = $match[1];

    // use parenthesis address if given
    if(is_numeric(substr($pstring, 0, 1)))
    {
        $pstring .= $sfAddress;
        $pstring = preg_replace('!\s+!', ' ', $pstring);
        $pstring = str_replace(' ,', ',', $pstring);
        return $pstring;
    }

    // use standard address
    else
    {
        $loc = str_replace('('.$pstring.')', '', $loc); 
        $loc .= $sfAddress;
        $loc = preg_replace('!\s+!', ' ', $loc);
        $loc = str_replace(' ,', ',', $loc);
        return $loc;
    }
}




/*
 * Get geo coordinates for group of addresses
 */
function coordinates($address)
{
    // get amount of addresses
    $count = count($addresses);

    // geocoder api link
    $geocoder = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

    $bounds = '37.54512174599488,-122.58132934570312|37.864554557605615,-122.26444244384766';

    // google api key
    $apiKey = 'AIzaSyBTHS3T4nIfN0vu18bF0NfuYQOtWo8rQFk';

    $address = str_replace(' ', '+', $address);

    // create url to geocode address
    $url = $geocoder.$address.'&bounds='.$bounds.'&key='.$apiKey;

    // return geocoded address
    $json = json_decode(file_get_contents($url));

    // get lat and lng coordinates
    $lat = $json->results[0]->geometry->location->lat;
    $lng = $json->results[0]->geometry->location->lng;

    return Array('lat' => $lat, 'lng' => $lng);
}




/*
 * Geocode addresses to get map coordinates 
 */
function geocode($movies)
{
    $movies = (array) $movies;
    $movieKeys = array_keys($movies);

    for($i = 0; $i < count($movies); $i++)
    {
        // flush sleep timer
        ob_implicit_flush(true);
        ob_end_flush();

        $key = $movieKeys[$i];

        $locations = $movies[$key]->locations;

        for($ii = 0; $ii < count($locations); $ii++)
        {
            if(strlen($locations[$ii]['title']))
            {
                $location = fullAddress($locations[$ii]['title']);
                $geo = coordinates($location);

                if($geo['lat']) $movies[$key]->locations[$ii]['lat'] = $geo['lat'];
                if($geo['lng']) $movies[$key]->locations[$ii]['lng'] = $geo['lng'];

                sleep(.125);
            }
        }

        // wait 1 second to not violate geocode limit
        sleep(1);
    }

    return $movies;
}




?>
