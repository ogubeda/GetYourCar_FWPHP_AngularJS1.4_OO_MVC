<?php
//////
class controller_contact {
    function sendEmail() {
        $messageAdmin = ['type' => 'admin', 
                            'inputName' => $_POST['name'], 
                            'fromEmail' => $_POST['email'], 
                            'inputMatter' => $_POST['matter'], 
                            'inputMessage' => $_POST['message']];
        $messageClient = ['type' => 'contact', 
                            'toEmail' => $_POST['email'], 
                            'inputMatter' => '', 
                            'inputMessage' => ''];
        $emailAdmin = json_decode(mail::setEmail($messageAdmin), true);
        //////
        if (!empty($emailAdmin['id'])) {
            $emailClient = json_decode(mail::setEmail($messageClient), true);
            if (!empty($emailClient['id'])) {
                echo 'true';
                //////
                return;
            }// end_if
        }// end_if
        echo 'false';
    }// end_sendEmail
}// end_controller_contact