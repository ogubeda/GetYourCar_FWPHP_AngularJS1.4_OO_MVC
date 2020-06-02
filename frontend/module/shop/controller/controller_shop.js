getyourcar.controller('controller_shop', function($scope, services, filters, cars) {
    let filteredCars = [];
    let currentCars = [];

    $scope.filters = filters;
    $scope.itemsPerPage = 12;
    $scope.totalItems = cars.length;
    $scope.currentPage = 1;
    $scope.enabledFilters = false;

    $scope.showDetails = function(carPlate) {
        location.href = "#/shop/" + carPlate;
    };// end_showDetails

    $scope.pageChanged = function() {
        $scope.cars = cars.slice((($scope.currentPage - 1) * $scope.itemsPerPage), ($scope.currentPage * $scope.itemsPerPage));
    };// end_PageChanged

    $scope.filterCars = function(value, key) {
        for (row in cars) {
            if (cars[row][key] == value) {
                if (!currentCars.includes(cars[row].carPlate)) {
                    filteredCars.push(cars[row]);
                    currentCars.push(cars[row].carPlate);
                }// end_if
            }// end_if
        }// end_for
        
        setPage(filteredCars, 1);
        $scope.enabledFilters = true;
    };// end_filterCars

    if (localStorage.brandShop) {
        $scope.filterCars(localStorage.brandShop, 'brand');
        localStorage.removeItem('brandShop');
    }else {
        $scope.cars = cars.slice((($scope.currentPage - 1) * $scope.itemsPerPage), (($scope.currentPage) * $scope.itemsPerPage));
    }// end_else

    $scope.removeFilter = function(value, key) {
        let newFilters = [];
        let newCurrentCars = [];
        
        for (row in filteredCars) {
            if (filteredCars[row][key] != value) {
                newFilters.push(filteredCars[row]);
                newCurrentCars.push(filteredCars[row].carPlate)
            }// end_if
        }// end_for
        
        if (newFilters.length > 0) {
            setPage(newFilters, 1, newFilters, newCurrentCars);
        }else {
            $scope.clearAllFilters();
        }// end_else
    };// end_removeFilter

    $scope.clearAllFilters = function() {
        setPage(cars, 1, [], [])
        $scope.enabledFilters = false;
    };// end_clearAllFilters

    function setPage(carsVal, currentPageVal, filteredCarsVal = undefined, currentCarsVal = undefined) {
        $scope.currentPage = currentPageVal;
        $scope.totalItems = carsVal.length;
        $scope.cars = carsVal.slice((($scope.currentPage - 1) * $scope.itemsPerPage), (($scope.currentPage) * $scope.itemsPerPage));

        if (filteredCarsVal != undefined) {
            filteredCars = filteredCarsVal;
        }// end_if 

        if (currentCarsVal != undefined) {
            currentCars = currentCarsVal;
        }// end_if
    }// end_setPage

    $scope.detectFav = function(carPlate) {
        services.post('shop', 'updateFavs', {JWT: localStorage.token, carPlate: carPlate})
        .then(function(response) {
            console.log(response);
        }, function(error) {
            console.log(error);
        });
    };// end_detectFav

    $scope.addToCart = function(carPlate) {
        services.put('cart', 'storeCart', {carPlate: carPlate, days: 1, JWT: localStorage.token})
        .then(function(response) {
            console.log(response);
        }, function(error) {
            console.log(error);
        });
    };// end_addToCart
});