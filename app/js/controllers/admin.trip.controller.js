/**
 * @author ctola
 */
(function() {
    angular
        .module('app')
        .controller('AdminTripController', AdminTripController);
	
	AdminTripController.$inject = [ 'TripFactory' ];
    function AdminTripController( TripFactory ) {

        var vm = this;
            vm.showExpenses = showExpenses,
            vm.openModal = false,
            vm.trips = [];

        TripFactory.get().then(
            function (r) {
                    vm.trips = r.trips;
                }
        );


        //-- load expenses list
        function showExpenses(trip){
            vm.openModal = true;
            vm.trip =  trip

        };

    }
})();