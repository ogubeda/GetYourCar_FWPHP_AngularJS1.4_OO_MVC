<?php
//////
session_start();
class controller_home {
    function homePageSlide() {
        echo common::accessModel('home_model', 'getSlider_home') -> getResolve();
    }// end_homePageSlide

    function homePageCat() {
        echo common::accessModel('home_model', 'getCategories_home');
    }// end_homePageCat

    function incrementView() {
        echo common::accessModel('home_model', 'IncView_home', $_POST['brand']);
    }// end_incrementView

}// end_controller_home