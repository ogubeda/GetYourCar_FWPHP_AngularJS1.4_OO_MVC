<?php
//////
session_start();

class controller_shop {
    function sendInfo() {
        echo common::accessModel('shop_model', 'getInfo_shop') -> getResolve();
    }// sendInfo

    function read() {
        echo common::accessModel('shop_model', 'getCarDetails_shop', $_POST['carPlate']) -> getResolve();
    }// end_read

    function sendFilters() {
        echo common::accessModel('shop_model', 'getFilters_shop');
    }// end_sendFilters

    function sendAllCon() {
        echo common::accessModel('shop_model', 'getAllConc_shop') -> getResolve();
    }// end_sendAllCon

    function viewUp() {
        echo common::accessModel('shop_model', 'setViewUpCars_shop', $_POST['carPlate']);
    }// end_viewUp

    function sendFavs() {
        echo common::accessModel('shop_model', 'getUserFavs_shop', [$_POST['JWT'], $_SESSION['JWT_Secret']]);
    }// end_sendFavs

    function sendFavsDetails() {
        echo common::accessModel('shop_model', 'getUserFavDetails_shop', [$_POST['JWT'], $_SESSION['JWT_Secret'], $_POST['carPlate']]);
    }

    function updateFavs() {
        if (!empty($_POST['JWT'])) {
            echo common::accessModel('shop_model', 'setUserFav_shop', [$_POST['JWT'], $_SESSION['JWT_Secret'], $_POST['carPlate']]);
            return;
        }// end_if
        echo 'no-login';
    }// end_updateFavs
}// end_controller_shop