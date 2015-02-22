// Ionic Starter App


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

//localstorage
angular.module('ionic.utils', [])


//add requires here
angular.module('starter', ['ionic', 'starter.controllers', 'highcharts-ng', 'ionic.utils'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.graph', {
    url: "/graph",
    views: {
      'menuContent': {
        templateUrl: "templates/graph.html",
      }
    }
  })

  .state('app.input-score', {
    url: "/input-score",
    views: {
      'menuContent': {
        templateUrl: "templates/input-score.html"
      }
    }
  })
    .state('app.choose-goals', {
    url: "/choose-goals",
    views: {
      'menuContent': {
        templateUrl: "templates/choose-goals.html"
      }
    }
  })
      .state('app.complete-goals', {
    url: "/complete-goals",
    views: {
      'menuContent': {
        templateUrl: "templates/complete-goals.html"
      }
    }
  })
      .state('app.goals', {
    url: "/goals",
    views: {
      'menuContent': {
        templateUrl: "templates/goals.html"
      }
    }
  })
  
    .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html"
      }
    }
  })
  
      .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/goals');
});


