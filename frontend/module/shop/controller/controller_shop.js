getyourcar.controller('controller_shop', function($scope, services, filters, cars, favs, cart) {
    let filteredCars = [];
    let currentCars = [];

    $scope.filters = filters;
    $scope.itemsPerPage = 12;
    $scope.totalItems = cars.length;
    $scope.currentPage = 1;
    $scope.currentFilters = {};
    $scope.favs = [];
    $scope.cart = [];

    for (row in cart) {
        $scope.cart.push(cart[row].carPlate);
    }// end_for
    for (row in favs) {
        $scope.favs.push(favs[row].carPlate);
    }// end_for

    $scope.showDetails = function(carPlate) {
        location.href = "#/shop/" + carPlate;
    };// end_showDetails

    $scope.pageChanged = function() {
        $scope.cars = cars.slice((($scope.currentPage - 1) * $scope.itemsPerPage), ($scope.currentPage * $scope.itemsPerPage));
    };// end_PageChanged

    $scope.filterCars = function(value, key) {
        $scope.currentFilters[value + '-' + key] = true;

        for (row in cars) {
            if (cars[row][key] == value) {
                if (!currentCars.includes(cars[row].carPlate)) {
                    filteredCars.push(cars[row]);
                    currentCars.push(cars[row].carPlate);
                }// end_if
            }// end_if
        }// end_for
        
        setPage(filteredCars, 1);
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
        
        $scope.currentFilters[value + '-' + key] = false;

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
            switch (response) {
                case 'true':
                    $scope.favs.push(carPlate);
                    break;
                case '1':
                    $scope.favs.splice($scope.favs.indexOf(carPlate), 1);
                    break;
                default:
                    localStorage.jumpPage = "shop";
                    location.href = "#/login";
            }// end_switch
        }, function(error) {
            console.log(error);
        });
    };// end_detectFav

    $scope.addToCart = function(carPlate) {
        services.put('cart', 'storeCart', {carPlate: carPlate, days: 1, JWT: localStorage.token})
        .then(function(response) {
            if (response === 'true') {
                $scope.cart.push(carPlate);
            }// end_if

        }, function(error) {
            console.log(error);
        });
    };// end_addToCart
});