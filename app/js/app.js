// This will include ./node_modules/angular/angular.js
// and give us access to the `angular` global object.
require('angular');
require('angular-ui-router');
require('angular-route');
// require('angular-animate');

// Create your app
var app = angular.module('appName',
  [
    'ngRoute',
    /*'ngAnimate',*/
    'chatapp.controller',
    'chatapp.services',
    'chatapp.directives'
  ]);

// Configuration
app.config(function($logProvider){
  $logProvider.debugEnabled(false);
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/anyurl', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      }).
      otherwise({
        redirectTo: '/anyurl'
      });
  }]);

// Run
app.run(function($log){
  $log.debug("test debug");
});
