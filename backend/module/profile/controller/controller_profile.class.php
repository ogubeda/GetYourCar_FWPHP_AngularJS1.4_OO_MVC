<?php
//////
session_start();
class controller_profile {
    function sendUserFavs() {
        echo common::accessModel('profile_model', 'getFavsUser_profile', [$_POST['JWT'], $_SESSION['JWT_Secret']]);
    }// end_sendUserFavs

    function sendData() {
        echo common::accessModel('profile_model', 'getUserData_profile', [$_POST['JWT'], $_SESSION['JWT_Secret']]);
    }// end_sendData

    function deleteProfile() {
        echo common::accessModel('profile_model', 'deleteUser_profile', [$_POST['JWT'], $_SESSION['JWT_Secret']]);
    }// end_deleteProfile

    function showPurchases() {
        echo common::accessModel('profile_model', 'getUserPurchases_profile', [$_POST['JWT'], $_SESSION['JWT_Secret']]);
    }// end_showPurchases

    function updateUserData() {
        echo common::accessModel('profile_model', 'setUserData_profile', [$_POST['JWT'], $_SESSION['JWT_Secret'], $_POST['user']]);
    }// end_updateUserData

    function changePassword() {
        echo common::accessModel('profile_model', 'setUserPassword_profile', [$_POST['JWT'], $_SESSION['JWT_Secret'], $_POST['password']]);
    }// end_changePassword
}// end_controller_profile