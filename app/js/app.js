// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

angular
.module('app', [
  'ui.router',
  'oc.lazyLoad',
  'ncy-angular-breadcrumb',
  'angular-loading-bar'
])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 1;
}])
	.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
  $rootScope.$on('$stateChangeSuccess',function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}])

.constant('serverSettings', {
          webApi: 'http://192.168.43.235:3000'
})


.run(function($rootScope , $state, tokenAuthService){

    $rootScope.logout =function(){
        localStorage.setItem("user", null);
        $state.go("appSimple.login");
    };

      $rootScope.$on("$locationChangeSuccess" , function checkValid() {

        var user =localStorage.getItem("user");
        console.log(JSON.parse(localStorage.getItem("user")).username);
        $rootScope.username = JSON.parse(localStorage.getItem("user")).username;

        if((user==undefined)||(user=="null")){
            $state.go("appSimple.login");
            
        }
    });


});


