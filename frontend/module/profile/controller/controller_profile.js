getyourcar.controller('controller_profile', function($scope, userData, userPurchases, userFavs, services, services_logIn) {
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

    $scope.deleteAccount = function() {
        services.put('profile', 'deleteProfile', {JWT: localStorage.token})
        .then(function(response) {
            if (response === 'true') {
                services_logIn.logOut();
            }// end_if
            
        }, function(error) {
            console.log(error);
        });
    };// end_deleteAccount
});