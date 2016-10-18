/**
 * @author ctola
 */
angular
    .module("app")
    .config(appConfig);

appConfig.$inject =['RestangularProvider', 'ENDPOINT_URL'];

function appConfig(RestangularProvider, ENDPOINT_URL) {
    RestangularProvider.setBaseUrl(ENDPOINT_URL);
}