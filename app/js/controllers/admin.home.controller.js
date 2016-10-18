/**
 * @author ctola
 */
(function() {
    angular
        .module('app')
        .controller('AdminHomeController', AdminHomeController);
	
	AdminHomeController.$inject = ['$rootScope', '$filter', 'EmployeeFactory', 'toastr'];
    function AdminHomeController($rootScope, $filter, EmployeeFactory, toastr) {

        var vm = this;
            vm.createEmployee = createEmployee,
            vm.openModal = false,
            vm.openModalTrip = false,
            vm.employees = [];

        
        EmployeeFactory.get().then(
            function (r) {
                    vm.employees = r.users;
                    console.log(r)
                }
        );

        vm.params = {
            "user": {
                "email": ''
            }
        }

        //-- Create Employee
        function createEmployee(){
            EmployeeFactory.save(vm.params).then(
                function (r) {
                    toastr.success('OK');
                    vm.openModal = false;
                    vm.params = {
                            "user": {
                                "email": ''
                            }
                        }
                },
                function(err){
                    console.log(err.data.errors);
                    angular.forEach(err.data.errors,
                        function (value, key, array) {
                            if( angular.isArray(value) ){
                                toastr.error(value.join('<br/>'), $filter('humanize')(key));
                            }else{
                                toastr.error(value, $filter('humanize')(key));
                            }
                            

                            //console.log("a[" + index + "] = " + element);
                        });
                }
            )
        }

    }
})();