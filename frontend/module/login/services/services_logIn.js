getyourcar.factory('services_logIn', ['$rootScope', 'services', 'services_localStorage', function($rootScope, services, services_localStorage) {
    let service = {printMenu: printMenu, logOut: logOut, redirectLogIn: redirectLogIn};
    return service;

    function printMenu() {
        if ((localStorage.token) && (localStorage.secureSession)) {
            services.post('login', 'returnSession', {jwt: localStorage.token, secureSession: localStorage.secureSession})
            .then(function(response) {
                if (response.secureSession) {
                    $rootScope.showLogIn = false;
                    $rootScope.showProfile = true;
                    $rootScope.profileName = response.username;

                    services_localStorage.setSession(response.secureSession, response.jwt);

                    if (response.type === "client") {
                        $rootScope.showCRUD = false;
                    }// end_if
                    if (response.type === "admin") {
                        $rootScope.showCRUD = true;
                    }// end_if
                }// end_if
                return;
            }, function(error) {
                console.log(error);
            });// end_services
        }// end_if
        $rootScope.showLogIn = true;
        $rootScope.showProfile = false;
    }// end_logIn

    function redirectLogIn(secureSession, JWTToken) {
        let jumpPage = (localStorage.jumpPage) ? services_localStorage.setJumpPage() : 'home';

        services_localStorage.setSession(secureSession, JWTToken);
        printMenu();
        location.href = "#/" + jumpPage;
    }// end_redirectLogIn

    function logOut() {
        services.get('login', 'logOut')
        .then(function(response) {
            if (response === "Done") {
                services_localStorage.clearSession();
                printMenu();
                location.href = "#/home";
            }// end_if
        }, function(error) {
            console.log(error);
        });
    }// end_logOut
}]);// end_services_login