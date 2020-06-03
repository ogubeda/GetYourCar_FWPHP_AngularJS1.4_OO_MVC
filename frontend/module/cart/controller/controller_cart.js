getyourcar.controller('controller_cart', function($scope, services, toastr, dataCart) {
    $scope.dataCart = "";
    $scope.showCart = false;
    $scope.qtyDays = {};

    if (Array.isArray(dataCart)) {
        $scope.dataCart = dataCart;
        $scope.showCart = true;
    }// end_if

    $scope.maxDays = function(num) {
        let daysArr = [];

        for (let i = 0; i < num; i++) {
            daysArr.push((i + 1).toString());
        }// end_for

        return daysArr;
    };// end_maxDays

    $scope.changeDays = function(carPlate) {
        services.put('cart', 'updateDays', {days: $scope.qtyDays[carPlate], JWT: localStorage.token, carPlate: carPlate})
        .then(function(response) {
            console.log(response);
            updateCart();

        }, function(error) {
            console.log(error);
        });
    };// end_changeDays

    $scope.deleteFromCart = function(carPlate) {
        // $scope.qtyDays[carPlate]
        console.log($scope.qtyDays[carPlate]);
        // services.put('cart', 'removeCart', {carPlate: carPlate, JWT: localStorage.token})
        // .then(function(response) {
        //     if (response === 'true') {
        //         updateCart();
        //     }// end_if

        // }, function(error) {
        //     console.log(error);
        // });
    };// end_deleteFromCart

    $scope.checkOut = function() {
        services.put('cart', 'checkOut', {JWT: localStorage.token})
        .then(function(response) {
            if (response != "false") {
                forceEmptyCart();
                toastr.success('Thanks for trust in our cars :)' ,'Purchase succesfully.');
            }else {
                toastr.error("It seems you don't have enough money." ,'Error');
            }// end_else

        }, function(error) {
            console.log(error);
        });// end_services
    }; // end_checkOut

    function updateCart() {
        services.post('cart', 'loadDataCart', {JWT: localStorage.token})
        .then(function(response) {
            if (Array.isArray(response)) {
                $scope.dataCart = response;
            }else {
                forceEmptyCart();
            }// end_else

        }, function(error) {
            console.log(error);
        });// end_services
    }// end_updateCart

    function forceEmptyCart() {
        $scope.dataCart = "";
        $scope.showCart = false;
    }// end_forceEmptyCart
});