var getyourcar = angular.module('getyourcar', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngSanitize','toastr', 'ui.bootstrap']);
//////
getyourcar.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
                .when("/home", {
                    templateUrl: "frontend/module/home/view/view_home.html", 
                    controller: "controller_home",
                    resolve: {
                        featuredCars: function (services) {
                            return services.get('home','homePageSlide');
                        },
                        viewedBrands: function (services) {
                            return services.get('home','homePageCat');
                        }
                    }// end_resolve
                }).when("/contact", {
                    templateUrl: "frontend/module/contact/view/view_contact.html", 
                    controller: "controller_contact"
                }).when("/shop", {
                    templateUrl: "frontend/module/shop/view/view_shop.html", 
                    controller: "controller_shop",
                    resolve: {
                        filters: function (services) {
                            return services.get('shop', 'sendFilters');
                        },
                        cars: function (services) {
                            return services.get('shop', 'sendInfo');
                        }// end_resolve
                    }
                }).when('/shop/:carPlate' , {
                    templateUrl: "frontend/module/shop/view/view_shopDetails.html",
                    controller: "controller_shopDetails",
                    resolve: {
                        car: function(services, $route) {
                            return services.post('shop', 'read', {'carPlate': $route.current.params.carPlate})
                        }
                    }// end_resolve
                }).when("/login", {
                    templateUrl: "frontend/module/login/view/view_logIn.html",
                    controller: "controller_logIn"
                }).when("/register", {
                    templateUrl : "frontend/module/login/view/view_register.html",
                    controller: "controller_register"
                }).when("/recover", {
                    templateUrl: "frontend/module/login/view/view_recover.html",
                    controller: "controller_recover"
                }).when("/login/activate/:token", {
                    resolve: {
                        activateUser: function(services, $route, toastr) {
                            services.put('login', 'validateEmail', {'token': $route.current.params.token})
                            .then(function(response) {
                                if (response == 1) {
                                    toastr.success('Thank you for verifing your account.' ,'Account verified..');
                                }else {
                                    toastr.error('The current token is invalid.' ,'Error');
                                }// end_else
                                location.href = "#/login";
                            }, function(error) {
                                console.log(error);
                            });// end_services
                        }// end_activateUser
                    }// end_resolve
                }).when("/login/recover/:token", {
                    templateUrl: "frontend/module/login/view/view_recoverForm.html",
                    controller: "controller_recoverForm",
                    resolve: {
                        checkToken: function(services, $route, toastr) {
                            services.post('login', 'checkTokenRecover', {'token': $route.current.params.token})
                            .then(function(response) {
                                if (response == 'fail') {
                                    toastr.error("The current token is invalid." ,'Error');
                                    location.href = "#/home";
                                }// end_if
                            }, function(error) {
                                console.log(error);
                            });
                        }// end_checkToken
                    }// end_resolve
                }).when("/profile", {
                    templateUrl: "frontend/modules/login/view/profile.view.html",
                    controller: "profileCtrl",
                    resolve: {
                        infoUser: function (services,localstorageService) {
                            return services.get('login', 'print_user',localstorageService.getUsers());
                        }
                    }
                }).when("/cart", {
                    templateUrl: "frontend/module/cart/view/view_cart.html",
                    controller: "controller_cart",
                    resolve: {
                        dataCart: function(services) {
                            return services.post('cart', 'loadDataCart', {JWT: localStorage.token});
                        }
                    }
                }).otherwise("/home", {
                    templateUrl: "frontend/module/home/view/view_home.html", 
                    controller: "controller_home"
                });
    }]);
