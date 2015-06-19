// Module for Directives
angular.module('chatapp.directives', [])

  // sidebar directive / partial for chat
  .directive('anyDirective', function() {
    return {
      templateUrl: 'partials/directive.html'
    };
  })
;
