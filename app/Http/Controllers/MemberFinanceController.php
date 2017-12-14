<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class MemberFinanceController extends Controller
{
    //for opensecrets api calls

    function index($cid, $method){
    	$opensecretsKey = env('OPENSECRETS_KEY');
    	$opensecretsEndpoint = 'http://www.opensecrets.org/api/?method=' . $method . '&cid=' . $cid . '&output=json' . '&apikey=' . $opensecretsKey;
    	$client = new Client();
    	$result = $client->get($opensecretsEndpoint);

    	$statusCode = $result->getStatusCode();
    	return $result->getBody();
    }
}