<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if($_POST) {

	$sender = $_POST['sender'];
	$subject = $_POST['subject'];
	$content = $_POST['content'];

	function sendEmail($sender, $subject, $content) {

		$to = 'letter2artemy@gmail.com';

		$headers  = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=UTF-8\r\n";
		$headers .= "From: $sender\r\n";

		$content = wordwrap($content, 70, "\r\n");

		$result = mail($to, $subject, $content, $headers);

		if( $result == true ) {
			echo json_encode(array(
				'success'=> true,
				'message' => 'Message sent successfully'
			));
		} else {
			echo json_encode(array(
				'error'=> true,
				'message' => 'Error sending message'
			));
		}

	}

	sendEmail($sender, $subject, $content);

}

?>