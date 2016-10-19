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
        $rootScope.base_url = BASE_URL;

        $rootScope.logout = function(){
            console.log(SessionManagerFactory)
            SessionManagerFactory.Logout().then(
                    function(result){
                        toastr.success("Logout correctly!");
                        $timeout(function() {
                            $state.go('login');
                        }, 1200);
                    },

                    function(error){
                        toastr.error(error.error, "Error");
                        $timeout(function() {
                            $state.go('login');
                        }, 1200);
                    }
                );
        };

        $rootScope.$on('$stateChangeStart', function(event, next, current) {
            var isAuthenticated = SessionManagerFactory.isAuthenticated();

            if( !isAuthenticated && next.name != 'login'){
                $state.go('login');
                $rootScope.current_user = null;
                localStorage.removeAll();
                event.preventDefault();
            }else if( isAuthenticated ){
                $rootScope.current_user = localStorage.getObject("user");

                //-- If no have permission
                if( next.session.role != $rootScope.current_user.role ){
                    toastr.error('You no have permision', "Unauthorize");
                    $state.go( $rootScope.current_user.role );
                    event.preventDefault();
                }

                //-- Redirect to specifiq role
                if(next.name == 'login'){
                    $state.go( $rootScope.current_user.role );
                    event.preventDefault();
                }
            }

        });

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        //-- Angular interceptor
        Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
            if (response.status === 401) {
                $rootScope.current_user = null;
                localStorage.removeAll();

                angular.forEach(response.data.errors,
                        function (value, key, array) {
                            toastr.error(value, key)
                            //console.log("a[" + index + "] = " + element);
                        })
                $state.go('login');

                return false; // error handled
            }

            return true; // error not handled
        });
    };

})();
