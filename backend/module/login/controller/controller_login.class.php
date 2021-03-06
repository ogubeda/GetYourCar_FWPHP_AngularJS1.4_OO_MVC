<?php
//////
session_start();
$path = $_SERVER['DOCUMENT_ROOT'] . '/frameworkCars.v.1.3/backend/';
include ($path . 'module/login/model/activity/processingSession.php');
//////
class controller_login {
    function register() {
        $result = common::accessModel('login_model', 'registerUserClient_login', [$_POST['username'], $_POST['email'], $_POST['password']]);
        $email = [];
        //////
        if ($result['query'] != false) {
            $email = ['type' => 'validate', 'token' => $result['token'], 'toEmail' => $_POST['email']];
            mail::setEmail($email);
            echo 'Done';
            return;
        }// end_if
        echo 'fail';
    }// end_register

    function logIn() {
        echo common::accessModel('login_model', 'accessUser_login', [$_POST['username'], $_POST['password']]);
    }// end_logIn

    function socialLogIn() {
        echo common::accessModel('login_model', 'accessUserSocial_login', $_POST['profile']);
    }// end_socialLogIn

    function returnSession() {
        echo common::accessModel('login_model', 'getUserData_login', [$_POST['jwt'], $_SESSION['JWT_Secret'], $_POST['secureSession']]);
    }// end_returnSession

    function reload() {
        updateSession(true);
        $secret = common::generate_Token_secure(20);
        $token = json_decode(jwt_process::decode($_POST['JWT'], $_SESSION['JWT_Secret']), true)['name'];
        $_SESSION['JWT_Secret'] = $secret;
        echo json_encode(array('secureSession' => md5(session_id()), 'token' => jwt_process::encode($secret, $token['name'], $token['type'])));
    }// end_reload

    function logOut() {
        if (session_destroy()) {
            unset($_SESSION['user']);
            unset($_SESSION['type']);
            echo 'Done';
        }else {
            echo 'Error';
        }// end_else
    }// end_logOut

    function sendRecoverEmail() {
        $result = common::accessModel('login_model', 'verifyUser_login', $_POST['username']);
        $email = [];
        if ($result != false) {
            $email = ['type' => 'recover', 'token' => $result['token'], 'toEmail' => $result['email']];
            $sendedEmail = json_decode(mail::setEmail($email), true);
        }// end_if
        if (!empty($sendedEmail['id'])) {
            echo 'Done';
            return;
        }// end_if
        echo 'Fail';
    }// end_recoverPassword

    function checkTokenRecover() {
        echo common::accessModel('login_model', 'checkRecoverToken_login', $_POST['token']);
    }// end_checkTokenRecover

    function updatePassword() {
        echo common::accessModel('login_model', 'setUserNewPassword_login', [$_POST['password'], $_SESSION['token']]);
    }// end_updatePassword

    function validateEmail() {
        echo common::accessModel('login_model', 'verifyUserEmail_login', $_POST['token']);
    }// end_validateEmail
}// end_controller_login