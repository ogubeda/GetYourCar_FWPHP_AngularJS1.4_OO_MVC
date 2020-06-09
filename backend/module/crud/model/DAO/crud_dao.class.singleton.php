<?php

class crud_dao {
    static $_instance;

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function selectAllCars() {
        return db::query() -> select(['*'], 'allCars') -> execute() -> queryToArray(true) -> toJSON() -> getResolve();
    }// end_selectAllCars

    public function selectSingleCar($carPlate) {
        return db::query() -> select(['*'], 'allCars') -> where(['carPlate' => [$carPlate]]) -> execute() -> queryToArray() -> toJSON() -> getResolve();
    }// end_selectSingleCar

    public function insertCar($carPlate, $idCon, $brand, $model, $seats, $doors, $gearShift, $typeEngine, $cv, $maxSpeed, $roads, $extras, $startDate, $endDate, $views, $price) {
        return db::query() -> insert([['carPlate' => $carPlate, 'idCon' => $idCon, 'brand' => $brand, 'model' => $model, 'seats' => $seats, 'doors' => $doors,
                                        'gearShift' => $gearShift, 'typeEngine' => $typeEngine, 'cv' => $cv, 'maxSpeed' => $maxSpeed, 'roads' => $roads, 'extras' => $extras,
                                        'startDate' => $startDate, 'endDate' => $endDate, 'views' => $views, 'price' => $price]], 'allCars') -> execute() -> toJSON() -> getResolve();
    }// end_insertCar

    public function deleteCar($carPlate) {
        return db::query() -> delete('allCars') -> where(['carPlate' => [$carPlate]]) -> execute() -> toJSON() -> getResolve();
    }// end_deleteCar

    public function deleteAllCars() {
        return db::query() -> delete('allCars') -> execute() -> toJSON() -> getResolve();
    }// end_deleteAllCars

    public function updateCar() {

    }// end_updateCar
}// end_crud_dao