/**
 * @author ctola
 */
(function() {
  'use strict';
  
  angular
    .module('app',[
        'app.core',
        'ui.materialize',
        'ui.router',
        'ngResource'
    ])
    .run(appRun);
    // appRun.$inject =['RestangularProvider', 'ENDPOINT_URL'];
    function appRun( $rootScope, $state, Restangular, $timeout, toastr, BASE_URL, localStorage, SessionManagerFactory) {
        $rootScope.url = BASE_URL;

        $rootScope.$on('$stateChangeStart', function(event, next, current) {
            if( !SessionManagerFactory.isAuthenticated() && next.name != 'login'){
                $state.go('login');
                $rootScope.user = null;
                localStorage.reset();
                event.preventDefault();
            }else if( SessionManagerFactory.isAuthenticated() && next.name == 'login'){
                $rootScope.user = localStorage.getObject("user");
                $state.go( $rootScope.user.role + '.home' );
                event.preventDefault();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
            if (response.status === 401) {
                $rootScope.user = null;
                localStorage.reset();
                console.log(response.body);
                toastr.error("Your session has expired, you will be redirected to Home Page", "Error");
                $timeout(function() {
                    $state.go('login');
                }, 1200);

                return false; // error handled
            }

            return true; // error not handled
        });
    };

})();
