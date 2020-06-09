<?php

class crud_model {
    static $_instance;
    private $bll;

    function __construct() {
        $this -> bll = crud_bll::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function getAllCarsData_crud() {
        return $this -> bll -> getAllCarsData_crud_BLL();
    }// end_getAllCarsData_crud

    public function getCarData_crud($args) {
        return $this -> bll -> getCarData_crud_BLL($args);
    }// end_getCarData_crud

    public function putCarData_crud($args) {
        return $this -> bll -> putCarData_crud_BLL($args);
    }// end_putCarData_crud

    public function removeCar_crud($args) {
        return $this -> bll -> removeCar_crud_BLL($args);
    }// end_removeCar_crud

    public function removeAllCars_crud($args) {
        return $this -> bll -> removeAllCars_crud_BLL($args);
    }// end_removeAllCars_crud
}// end_crud_model