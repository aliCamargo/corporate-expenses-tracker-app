
# CORPORATE EXPENSES TRACKER APP

This app keep track of travel expenses of its employees and simplify the process of refund total travel expenses to each employee.


## Getting Started

* Using npm: 3.6.0 

* Using gulp: 3.9.1 

* Using Angular: 1.5.3

* Using Angular materialize: 0.1.3

* Using Angular ui-router: 0.2.18

* Using Sass: 3.4.22


1. Switch to project folder:

        $ cd corporate-expenses-tracker-api

2. go to 'js/core/costants.core.js' and setup base url of the api service:

	```javascript
	//-- costants.core.js --//
	(function() {
	    'use strict';

	    angular
	        .module('app.core')

	        /* ----------------------------  local ---------------------------------- */
	        // .constant('ENDPOINT_URL', 'http://lvh.me:3000/api')

	        /* ----------------------------  Production ---------------------------------- */
	        .constant('ENDPOINT_URL', 'https://corporate-expenses-tracker.herokuapp.com/api')

	})();
	```

3. Install npm package:
    
        $ npm install

4. Install bower package:
    
        $ bower install

3. Running Project in `http://localhost:8085`:

        gulb


## Best practices

* Single Responsibility
	
	The same components are now separated into their own files

 ```javascript
	// some.controller.js
	angular
	    .module('app')
	    .controller('SomeController', SomeController);

	function SomeController() { }
```

 ```javascript
	// some.factory.js
	angular
	    .module('app')
	    .factory('someFactory', someFactory);

	function someFactory() { }
```
		
* Use Modules
	
	 ```javascript
	angular
	    .module('app', [
	        'ngAnimate',
	        'ngRoute',
	        'app.core'
	    ]);
	```

* Named vs Anonymous Functions

	```javascript
	angular
	    .module('app')
	    .controller('AdmnHomeController', AdmnHomeController);

	function AdmnHomeController() { }
	```

* UscontrollerAs with vm

	```javascript
	function CustomerController() {
	    var vm = this;
	    vm.name = {};
	    vm.sendMessage = function() { };
	}
	```

* Using function declarations and accessible members up top
 
 ```javascript
	function TripFactory($rootScope, $q, Restangular, localStorage) {

	      var factory = {
	        save: save,
	        update: update,
	        get: get, 
	        show: show,
	        remove: remove
	      }
 ```