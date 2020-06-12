getyourcar.controller('controller_profile', function($scope, userData, userPurchases, userFavs, services, services_logIn) {
    $scope.userData = userData;
    $scope.showUserData = true;
    $scope.showUserFavs = false;
    $scope.showUserPurchases = false;
    $scope.regUsername = /^[A-Za-z0-9._-]{5,15}$/;

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
        $scope.hideModifyBtn = false;
        $scope.showInputData = false;
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

    $scope.modifyAccount = function() {
        $scope.hideModifyBtn = true;
        $scope.showInputData = true;
        $scope.updateUsername = userData.username;
        $scope.updateEmail = userData.email;
    };// end_modifyAccount

    $scope.updateAccount = function() {
        let user = {username: $scope.updateUsername, email: $scope.updateEmail};

        services.put('profile', 'updateUserData', {JWT: localStorage.token, user: user})
        .then(function(response) {
            console.log(response);
            if (response === 'true') {
                services_logIn.printMenu(); 
                location.href = "#/home";
            }// end_if
        }, function(error) {
            console.log(error);
        });
    };// end_updateAccount
});