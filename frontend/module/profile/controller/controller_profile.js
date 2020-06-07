getyourcar.controller('controller_profile', function($scope, userData, userPurchases, userFavs) {
    $scope.userData = userData;
    $scope.showUserData = true;
    $scope.showUserFavs = false;
    $scope.showUserPurchases = false;

    if (Array.isArray(userPurchases)) {
        $scope.userPurchases = userPurchases;
    }// end_if
    if (Array.isArray(userFavs)) {
        $scope.userFavs = userFavs;
    }// end_if

    $scope.backToStart = function() {
        $scope.showUserData = true;
        $scope.showUserFavs = false;
        $scope.showUserPurchases = false;
    };// end_backToStart

    $scope.giveUserFavs = function() {
        $scope.showUserData = false;
        $scope.showUserFavs = true;
        $scope.showUserPurchases = false;
    };// end_giveUserFavs

    $scope.giveUserPurchases = function() {
        $scope.showUserData = false;
        $scope.showUserFavs = false;
        $scope.showUserPurchases = true;
    };// end_giveUserPurchases
});