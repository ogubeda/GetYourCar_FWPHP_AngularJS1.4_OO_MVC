<?php
//////
class shop_bll {
    private $dao;
    static $_instance;
    //////
    function __construct() {
        $this -> dao = shop_dao::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function getInfo_shop_BLL() {
        return $this -> dao -> selectShop();
    }// end_getInfo_shop

    public function getFilters_shop_BLL() {
        $colsArr = array('brand', 'seats', 'doors', 'typeEngine', 'gearShift');
        $returnArrBrands = array();
        foreach ($colsArr as $row) {
            $inside = [];
            $result = $this -> dao -> selectFilter($row);
            foreach ($result as $test) {
                $inside[] = array_values($test)[0];
            }// end_foreach
            $returnArrBrands[$row] = $inside;
        }//end_foreach
        if (!empty($returnArrBrands)) {
            return json_encode($returnArrBrands);
        }// end_if
        return 'Empty.';
    }// end_getFilters_shop_BLL

    public function getCarDetails_shop_BLL($args) {
        return $this -> dao -> selectDetails($args);
    }// end_getCarDetails_shop_BLL

    public function getAllConc_shop_BLL() {
        return $this -> dao -> selectAllCon();
    }// end_getAllConc_shop_BLL

    public function setViewUpCars_shop_BLL($args) {
        return $this -> dao -> viewUpCar($args);
    }// end_setViewUpCars_shop_BLL

    public function getUserFavs_shop_BLL($args) {
        return $this -> dao -> selectFavs(json_decode(jwt_process::decode($args[0], $args[1]), true)['name']);
    }// end_getUserFavs_shop_BLL

    public function setUserFav_shop_BLL($args) {
        $user = json_decode(jwt_process::decode($args[0], $args[1]), true)['name'];
        if ($this -> dao -> checkCarFav($args[2], $user) -> getResolve() > 0) {
            return $this -> dao -> deleteFav($args[2], $user);
        }// end_if
        return $this -> dao -> insertFav($args[2], $user);
    }//

    public function getUserFavDetails_shop_BLL($args) {
        return $this -> dao -> selectFavDetails(json_decode(jwt_process::decode($args[0], $args[1]), true)['name'], $args[2]);
    }// end_getUserFavDetails_shop_BLL
}// end_shop_bll