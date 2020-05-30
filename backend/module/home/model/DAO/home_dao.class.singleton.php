<?php
//////
class home_dao {
    static $_instance;
    //////
    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function selectSlide () {
        return db::query() -> select(['carPlate' ,'brand', 'model', 'image'], 'allCars') -> order(['cv'], 'DESC') -> limit(5) -> execute() -> queryToArray(true) -> toJSON();
    }// end_selectSlide

    public function selectCategories() {
        return db::query() -> select(['*'], 'brandCars') -> order(['views'], 'DESC') -> execute() -> queryToArray(true) -> toJSON() -> getResolve();
    }// end_selectCategories

    public function incView($brand) {
        return db::query() -> update(['views' => 'views + 1'], 'brandCars') -> where(['brand' => [$brand]]) -> execute();
    }// end_incView
}// end_home_dao