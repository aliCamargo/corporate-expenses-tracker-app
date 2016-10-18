(function() {
  'use strict';

  angular
    .module('app')
    .factory('EmployeeFactory', EmployeeFactory);

  EmployeeFactory.$inject = ['$q', 'Restangular', 'localStorage'];

  function EmployeeFactory($q, Restangular, localStorage) {
  	var baseServices = Restangular.all('admin/users');  		

      var factory = {
        save: save,
        get: get, 
        
      }
      return factory;

      function save(form) {
      	var token =  localStorage.getObject("access_token");
      	Restangular.setDefaultHeaders({Authorization: token});
		
          var def = $q.defer();

          baseServices.customPOST(form).then(function(result) {
                  def.resolve(result);
              },
              function(error) {
                  def.reject(error);
              });

          return def.promise;
      }


      function get() {
      	var token =  localStorage.getObject("access_token");
      	Restangular.setDefaultHeaders({Authorization: token});
		
          var def = $q.defer();

          baseServices.customGET().then(function(result) {
                  def.resolve(result);
              },
              function(error) {
                  def.reject(error);
              });

          return def.promise;
      }


  }
})();