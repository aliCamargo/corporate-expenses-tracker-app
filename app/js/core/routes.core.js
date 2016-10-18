angular
    .module('app.core')
    .config(appRoutes);

appRoutes.$inject =['$stateProvider', '$urlRouterProvider'];

function appRoutes($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: "views/session/login.html",
            controller: "SessionController as vm"
        })

        .state('admin', {
            url: '/admin',
            templateUrl: "views/admin/home.html",
            controller: "AdminHomeController as vm",
            resolve: {
                current_user: resolveUser
            }
        })

        .state('employee', {
            url: '/employee',
            templateUrl: "views/employee/home.html",
            controller: "EmployeeHomeController as vm",
            resolve: {
                current_user: resolveUser
            }
        })



        // .state('home', {
        //     url: '/home',
        //     templateUrl: "views/home.html",
        //     controller: "HomeController as vm"
        // })
        // .state('user', {
        //     url: '/user',
        //     templateUrl: "views/user.html",
        //     controller: "UserController as vm"
        // })
        // .state('option', {
        //     url: '/option',
        //     templateUrl: "views/option.html",
        //     controller: "OptionController as vm"
        // });



    function resolveUser(ServiceCore, toastr, Restangular, $stateParams, $q, $rootScope, localStorage) {
        var def = $q.defer();
        var user = localStorage.getObject('user');

        if( user != null && user != undefined ){
            def.resolve( user )
        }else{
            def.reject();
        }

        return def.promise;

    }
}