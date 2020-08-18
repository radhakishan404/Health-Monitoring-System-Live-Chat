<?php
error_reporting(0);

/* DEVELOPMENT CONFIG */
//DEFINE('PROJECTSTATUS','LIVE');
/*DEFINE('PROJECTSTATUS','STAGING');*/
DEFINE('PROJECTSTATUS', 'DEV');
/* DEVELOPMENT CONFIG */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

/* TIMEZONE CONFIG */
$timezone = "Asia/Kolkata";
if (function_exists('date_default_timezone_set')) date_default_timezone_set($timezone);
/* TIMEZONE CONFIG */

if (PROJECTSTATUS == "LIVE") {  // DEFAULT TO LIVE
	DEFINE('BASE_URL', '');
} else if (PROJECTSTATUS == "STAGING") {  // DEFAULT TO STAGING
	DEFINE('BASE_URL', ''); 
} else { // DEFAULT TO DEV
	DEFINE('BASE_URL', 'http://localhost/health-monitoring/');
}

/* BASE CONFIG */
DEFINE('PAGE_LIMIT', '10');
DEFINE('CURRENTDATETIME', date("Y-m-d H:i:s"));

//HTTP REQUEST CODE
DEFINE('HTTP_100', 100);	//Continue
DEFINE('HTTP_101', 101);	//Switching Protocols
DEFINE('HTTP_102', 102);	//Processing
DEFINE('HTTP_200', 200);	//success, status is true or false, when everything went ok or occurs any error
DEFINE('HTTP_201', 201);	//Created
DEFINE('HTTP_202', 202);	//Accepted
DEFINE('HTTP_203', 203);	//Non-Authoritative Information
DEFINE('HTTP_204', 204);	//No Content
DEFINE('HTTP_205', 205);	//Reset Content
DEFINE('HTTP_206', 206);	//Partial Content
DEFINE('HTTP_207', 207);	//Multi-Status
DEFINE('HTTP_208', 208);	//Already Reported
DEFINE('HTTP_226', 226);	//IM Used
DEFINE('HTTP_300', 300);	//Multiple Choices
DEFINE('HTTP_301', 301);	//Moved Permanently
DEFINE('HTTP_302', 302);	//Found
DEFINE('HTTP_303', 303);	//See Other
DEFINE('HTTP_304', 304);	//Not Modified
DEFINE('HTTP_305', 305);	//Use Proxy
DEFINE('HTTP_306', 306);	//Switch Proxy
DEFINE('HTTP_307', 307);	//Temporary Redirect
DEFINE('HTTP_308', 308);	//Permanent Redirect
DEFINE('HTTP_400', 400);	//Bad Request
DEFINE('HTTP_401', 401);	//Unauthorized
DEFINE('HTTP_402', 402);	//Payment Required
DEFINE('HTTP_403', 403);	//Forbidden
DEFINE('HTTP_404', 404);	//Not Found
DEFINE('HTTP_405', 405);	//Method Not Allowed
DEFINE('HTTP_406', 406);	//Not Acceptable
DEFINE('HTTP_407', 407);	//Proxy Authentication Required
DEFINE('HTTP_408', 408);	//Request Timeout
DEFINE('HTTP_409', 409);	//Conflict
DEFINE('HTTP_410', 410);	//Gone
DEFINE('HTTP_411', 411);	//Length Required
DEFINE('HTTP_412', 412);	//Precondition Failed
DEFINE('HTTP_413', 413);	//Request Entity Too Large
DEFINE('HTTP_414', 414);	//Request-URI Too Long
DEFINE('HTTP_415', 415);	//Unsupported Media Type
DEFINE('HTTP_416', 416);	//Requested Range Not Satisfiable
DEFINE('HTTP_417', 417);	//Expectation Failed
DEFINE('HTTP_418', 418);
DEFINE('HTTP_419', 419);	//Authentication Timeout
DEFINE('HTTP_420', 420);	//Method Failure
DEFINE('HTTP_422', 422);	//Unprocessable Entity
DEFINE('HTTP_423', 423);	//Locked
DEFINE('HTTP_424', 424);	//Failed Dependency OR Method Failure
DEFINE('HTTP_425', 425);	//Unordered Collection
DEFINE('HTTP_426', 426);	//Upgrade Required
DEFINE('HTTP_428', 428);	//Precondition Required
DEFINE('HTTP_429', 429);	//Too Many Requests
DEFINE('HTTP_431', 431);	//Request Header Fields Too Large
DEFINE('HTTP_444', 444);	//No Response
DEFINE('HTTP_449', 449);	//Retry With
DEFINE('HTTP_450', 450);	//Blocked by Windows Parental Controls
DEFINE('HTTP_451', 451);	//Redirect OR Unavailable For Legal Reasons
DEFINE('HTTP_494', 494);	//Request Header Too Large
DEFINE('HTTP_495', 495);	//Cert Error
DEFINE('HTTP_496', 496);	//No Cert
DEFINE('HTTP_497', 497);	//HTTP to HTTPS
DEFINE('HTTP_499', 499);	//Client Closed Request
DEFINE('HTTP_500', 500);	//Internal Server Error
DEFINE('HTTP_501', 501);	//Not Implemented
DEFINE('HTTP_502', 502);	//Bad Gateway
DEFINE('HTTP_503', 503);	//Service Unavailable
DEFINE('HTTP_504', 504);	//Gateway Timeout
DEFINE('HTTP_505', 505);	//HTTP Version Not Supported
DEFINE('HTTP_506', 506);	//Variant Also Negotiates
DEFINE('HTTP_507', 507);	//Insufficient Storage
DEFINE('HTTP_508', 508);	//Loop Detected
DEFINE('HTTP_509', 509);	//Bandwidth Limit Exceeded
DEFINE('HTTP_510', 510);	//Not Extended
DEFINE('HTTP_511', 511);	//Network Authentication Required
DEFINE('HTTP_598', 598);	//Network read timeout error
DEFINE('HTTP_599', 599);	//Network connect timeout error

DEFINE('LOGO', BASE_URL . '/images/logo.png');
DEFINE('LIMITINDEX', '10');
DEFINE('LATEST_ACTIVE_VERSION_CODE', 1); // block this version code and all versions below this

//Successfull Messages
DEFINE('TOKEN_SUCCESSFULL_TITLE', 'Update successfull');
DEFINE('TOKEN_SUCCESSFULL_MESSAGE', 'FCM updated successfully');
DEFINE('LOGIN_SUCCESSFULL_TITLE', 'Login Successfull');
DEFINE('LOGIN_SUCCESSFULL_MESSAGE', 'You have been logged in successfully.');

//Error Messages
DEFINE('SERVER_ERROR_TITLE', 'Server Error');
DEFINE('SERVER_ERROR_MESSAGE', 'We are unable to access this request at this moment. Please try again later.');
DEFINE('OTP_ERROR_TITLE', 'OTP expired');
DEFINE('OTP_ERROR_MESSAGE', 'The OTP for the registered mobile number has been expired. Please try again later or do resend OTP.');
DEFINE('OTP_SENT_MESSAGE', 'We have sent you an OTP. Please do enter the OTP to verify your phone number');
DEFINE('OTP_VALIDITY_MESSAGE', ' is your OTP for verifying account. This OTP is valid for only 5 minutes.');
DEFINE('OTP_INCORRECT_TITLE', 'Incorrect OTP');
DEFINE('OTP_INCORRECT_MESSAGE', 'The OTP you have entered was incorrect. Please do enter a correct OTP.');
DEFINE('MOBILE_ERROR_TITLE', 'Invalid mobile number');
DEFINE('MOBILE_ERROR_MESSAGE', 'Mobile number does not exists.');
DEFINE('MOBILE_ALREADY_VERIFIED_TITLE', 'Already verified');
DEFINE('MOBILE_ALREADY_VERIFIED_MESSAGE', 'The mobile number you have entered is already verified.');
DEFINE('LOGIN_ERROR_TITLE', 'Unable to login');
DEFINE('LOGIN_ERROR_MESSAGE', 'Mobile number is not registered. Please do sign up.');
DEFINE('DEACTIVE_ACCOUNT_TITLE', 'Account Inactive');
DEFINE('DEACTIVE_ACCOUNT_MESSAGE', 'Your account has been deactivated. Please contact admin.');
DEFINE('TOKEN_ERROR_TITLE', 'Invalid Token');
DEFINE('TOKEN_ERROR_MESSAGE', 'Invalid user login token.');
DEFINE('DATA_ERROR_TITLE', 'No Data');
DEFINE('DATA_ERROR_MESSAGE', 'No data available');
DEFINE('EMAIL_ERROR_TITLE', 'Invalid Email');
DEFINE('EMAIL_ERROR_MESSAGE', 'No such email id found');
DEFINE('USER_EXISTS_TITLE', 'User already exists');
DEFINE('USER_EXISTS_ERROR_MESSAGE', 'User already exists with this number. Please try using different mobile number');
DEFINE('USER_NOT_EXISTS_TITLE', 'User does not exists.');
DEFINE('USER_NOT_EXISTS_ERROR_MESSAGE', 'User does not exists. Invalid Request.');
