<?php
//////
class profile_bll {
    static $_instance;
    private $dao;
    //////
    function __construct() {
        $this -> dao = profile_dao::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance 

    public function getFavsUser_profile_BLL($args) {
        return $this -> dao -> selectFavs(json_decode(jwt_process::decode($args[0], $args[1]), true)['name']);
    }// end_getFavsUser_profile_BLL

    public function getUserData_profile_BLL($args) {
        return $this -> dao -> selectUser(json_decode(jwt_process::decode($args[0], $args[1]), true)['name']);
    }// end_getUserData_profile_BLL

    public function deleteUser_profile_BLL($args) {
        return $this -> dao -> deleteUser(json_decode(jwt_process::decode($args[0], $args[1]), true)['name']);
    }// end_deleteUser_profile_BLL

    public function getUserPurchases_profile_BLL($args) {
        return $this -> dao -> selectPurchases(json_decode(jwt_process::decode($args[0], $args[1]), true)['name']);
    }// end_getUserPurchases_profile_BLL

    public function setUserData_profile_BLL($args) {
        $token = json_decode(jwt_process::decode($args[0], $args[1]), true);
        if ($token['type'] == 'manual') {
            return $this -> dao -> updateUserData($token['name'], $args[2]['username'], $args[2]['email']);
        }// end_if
        return 'false';
    }// end_setUserData_profile_BLL
}// end_profile_bll