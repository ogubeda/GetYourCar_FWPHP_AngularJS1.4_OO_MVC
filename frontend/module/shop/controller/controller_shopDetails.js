getyourcar.controller('controller_shopDetails', function($scope, car, cart, favs) {

    console.log(car);
    $scope.car = car;
    $scope.cart = [];
    $scope.favs = [];

    for (row in cart) {
        $scope.cart.push(cart[row].carPlate);
    }// end_for
    for (row in favs) {
        $scope.favs.push(favs[row].carPlate);
    }// end_for

});