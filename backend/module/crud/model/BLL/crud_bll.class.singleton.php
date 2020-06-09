<?php

class crud_bll {
    static $_instance;
    private $dao;

    function __construct() {
        $this -> dao = crud_dao::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function getAllCarsData_crud_BLL() {
        return $this -> dao -> selectAllCars();
    }// end_getCarData_crud_BLL

    public function getCarData_crud_BLL($args) {
        return $this -> dao -> selectSingleCar($args);
    }// end_getCarData_crud_BLL

    public function putCarData_crud_BLL($args) {
        return $this -> dao -> insertCar($args[0], $args[1], $args[2], $args[3], $args[4], $args[5], $args[6], $args[7], $args[8], $args[9], $args[10], $args[11], $args[12], 
                                            $args[13], $args[14], $args[15]);
    }// end_putCarData_crud_BLL

    public function removeCar_crud_BLL($args) {
        return $this -> dao -> deleteCar($args);
    }// end_removeCarData_crud_BLL

    public function removeAllCars_crud_BLL($args) {
        return $this -> dao -> deleteAllCars($args);
    }// end_removeAllCars_crud_BLL
}// end_crud_bll