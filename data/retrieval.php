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
 * Convert address to useable address for google api 
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
    // google api key
    $apiKey = 'AIzaSyBSdGYPyAb255BboSfmP3KTWud9oMjAJTc';

    // geocoder api link
    $geocoder = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

    // replace spaces with +
    $address = str_replace(' ', '+', $address);

    // create url to geocode address
    $url = $geocoder.$address.'&bounds='.$bounds.'&key='.$apiKey;

    // return geocoded address
    $json = json_decode(file_get_contents($url));

    // get lat and lng coordinates
    $lat = $json->results[0]->geometry->location->lat;
    $lng = $json->results[0]->geometry->location->lng;

    // return response data
    return Array('lat' => $lat, 'lng' => $lng);
}




/*
 * Geocode addresses to get map coordinates 
 */
function geocode($movies)
{
    // ensure movies is array
    $movies = (array) $movies;

    // get movie keys
    $movieKeys = array_keys($movies);

    // loop through each movie
    for($i = 0; $i < count($movies); $i++)
    {
        // flush sleep buffer
        ob_implicit_flush(true);
        ob_end_flush();

        // get current movie key
        $key = $movieKeys[$i];

        // current movie locations
        $locations = $movies[$key]->locations;

        // loop locations and get geocoordinates
        for($ii = 0; $ii < count($locations); $ii++)
        {
            // ensure that a valid location is passed
            if($locations[$ii]['title'] != null && strlen($locations[$ii]['title']))
            {
                // convert location to full address before sending to get coordinates
                $location = fullAddress($locations[$ii]['title']);

                // get coordinates of the address
                $geo = coordinates($location);

                // latitude (ensure it's within san francisco limits)
                if($geo['lat'] > 37.54512174599488 && $geo['lat'] < 37.864554557605615) $movies[$key]->locations[$ii]['lat'] = $geo['lat'];
                else $movies[$key]->locations[$ii]['lat'] = null;

                // longitude (ensure it's within san francisco limits)
                if($geo['lng'] > -122.58132934570312 && $geo['lng'] < -122.26444244384766) $movies[$key]->locations[$ii]['lng'] = $geo['lng'];
                else $movies[$key]->locations[$ii]['lng'] = null;

                // sleep to ensure that no more than 10 request are made a second
                sleep(.11);
            }
        }

        // wait 1 second to not violate geocode limit
        sleep(1);
    }

    // return movies with geocoded addresses
    return $movies;
}


?>
