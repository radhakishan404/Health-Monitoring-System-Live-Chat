<?php 


include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['userToken']) && !empty($data['userToken'])) {
	$userToken = json_decode($data['userToken']);
	$userDetails = $appFunction->getUniqueUserByToken($userToken);
	$id = $userDetails['id'];
	if(!empty($userDetails)) {
		$patientQuery = $appFunction->getUniqueTableData('users', 'id', $id);
		$patientDataQuery = $appFunction->getUniqueTableData('patients', 'user_id', $id);

		$oneMonthDate = date('Y-m-d', strtotime('-1 months'))." 00:00:00";

		$patientReadings = $appFunction->query("SELECT * FROM patient_readings where patient_id = '".$id."' and updated >= '".$oneMonthDate."'");
		$patientReadingsData = array();
		while($row = $appFunction->fetch($patientReadings)) {
			$patientReadingsData[] = $row;
		}

		$readingJson = array();
		if(!empty($patientReadingsData)) {
			$blood_sugar = array();
			$blood_pressure = array();
			$heart_rate = array();
			$temprature = array();
			foreach($patientReadingsData as $key => $val) {
				$readingJson['labels'][] = date('d-M', strtotime($val['updated']));
				$blood_sugar[] = $val['blood_sugar'];
				$blood_pressure[] = 120/80;
				$heart_rate[] = $val['heart_rate'];
				$temprature[] = $val['temprature'];
			}
			$readingJson['datasets'][] = array(
				'label' => 'Blood Sugar',
				'backgroundColor' => 'rgba(255, 0, 54, 0.57)',
				'border-color' => 'rgb(255, 0, 0)',
				'borderWidth' => 1,
				'hoverBackgroundColor' => 'rgba(200, 34, 69, 0.57)',
				'hoverBorderColor' => 'rgba(149, 48, 69, 0.57)',
				'data' => $blood_sugar
			);
			$readingJson['datasets'][] = array(
				'label' => 'Blood Pressure',
				'backgroundColor' => 'rgba(51, 102, 168, 0.57)',
				'border-color' => 'rgba(62, 95, 138, 0.57)',
				'borderWidth' => 1,
				'hoverBackgroundColor' => 'rgba(69, 97, 134, 0.57)',
				'hoverBorderColor' => 'rgba(77, 94, 117, 0.57)',
				'data' => $blood_pressure
			);
			$readingJson['datasets'][] = array(
				'label' => 'Heart Rate',
				'backgroundColor' => 'rgba(58, 225, 34, 0.57)',
				'border-color' => 'rgba(69, 155, 56, 0.57)',
				'borderWidth' => 1,
				'hoverBackgroundColor' => 'rgba(69, 155, 56, 0.57)',
				'hoverBorderColor' => 'rgba(71, 130, 63, 0.57)',
				'data' => $heart_rate
			);
			$readingJson['datasets'][] = array(
				'label' => 'Temprature',
				'backgroundColor' => 'rgba(238, 205, 28, 0.57)',
				'border-color' => 'rgba(172, 151, 40, 0.57)',
				'borderWidth' => 1,
				'hoverBackgroundColor' => 'rgba(172, 151, 40, 0.57)',
				'hoverBorderColor' => 'rgba(128, 116, 54, 0.57)',
				'data' => $temprature
			);
		}

		$response['status'] = true;
		$response['userData'] = $patientQuery;
		$response['patientData'] = $patientDataQuery;
		$response['patientReadings'] = $patientReadingsData;
		$response['readingJson'] = $readingJson;
	} else {
		$response['status'] = false;
		$response['error'] = "invalid token";
		$response['message'] = "Invalid Token";
	}
} else {
	$response['status'] = false;
	$response['error'] = "Server Error";
	$response['message'] = "No token found";
}

echo json_encode($response);