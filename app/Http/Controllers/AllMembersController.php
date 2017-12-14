<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class AllMembersController extends Controller
{
    //get list of all members for searching
    public function index(){

	    $propublicaKey = env('PROPUBLICA_KEY');
	    $propublicaEndpoint = 'https://api.propublica.org/congress/v1/115/house/members.json';

	    $client = new Client();
	    $result = $client->get($propublicaEndpoint, [
	    	'headers' => [
	    		'X-API-Key' => $propublicaKey
	    	]
	    ]);

	    //will check status code later
	    $statusCode = $result->getStatusCode();
	    $body = $result->getBody();
	    return $body;
    }
}
