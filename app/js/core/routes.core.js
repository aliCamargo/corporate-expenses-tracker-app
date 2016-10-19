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
            controller: "SessionController as vm",
            session: {
                role: 'all',
                login: false
            }
        })

        .state('admin', {
            url: '/admin',
            templateUrl: "views/admin/home.html",
            controller: "AdminHomeController as vm",
            session: {
                role: 'admin', 
                login: true
            },
            children:[

            ]
        })

            .state('admin.trips', {
                url: '/trips',
                templateUrl: "views/admin/trips.html",
                controller: "AdminTripController as vm",
                session: {
                    role: 'admin',
                    login: true
                }
            })

        .state('employee', {
            url: '/employee',
            templateUrl: "views/employee/home.html",
            controller: "EmployeeHomeController as vm",
            session: {
                role: 'employee', 
                login: true
            }
        })

            .state('employee.expenses', {
                url: '/expenses/{trip_id:int}',
                templateUrl: "views/employee/expenses.html",
                controller: "EmployeeExpenseController as vm",
                session: {
                    role: 'employee',
                    login: true
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

}