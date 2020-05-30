getyourcar.controller('controller_shopDetails', function($scope, car) {
    for (row in car) {
        $scope[row] = car[row];
    }// end_for
});