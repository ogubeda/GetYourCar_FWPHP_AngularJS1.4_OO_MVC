getyourcar.controller('controller_shopDetails', function($scope, car, cart, favs, services) {
    $scope.car = car;
    $scope.cart = cart;
    $scope.favs = favs;

    $scope.detectFav = function(carPlate) {
        services.post('shop', 'updateFavs', {JWT: localStorage.token, carPlate: carPlate})
        .then(function(response) {
            switch (response) {
                case 'true':
                    $scope.favs = '1';
                    break;
                case '1':
                    $scope.favs = '0';
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
                $scope.cart = '1';
            }// end_if

        }, function(error) {
            console.log(error);
        });
    };// end_addToCart
});