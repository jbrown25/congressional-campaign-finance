<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class MemberBioController extends Controller
{
    //for opensecrets api calls

    function index($cid){
    	$opensecretsKey = env('OPENSECRETS_KEY');
    	$opensecretsEndpoint = 'http://www.opensecrets.org/api/?method=getLegislators' . '&id=' . $cid . '&output=json' . '&apikey=' . $opensecretsKey;
    	$client = new Client();
    	$result = $client->get($opensecretsEndpoint);

    	$statusCode = $result->getStatusCode();
    	return $result->getBody();
    }
}