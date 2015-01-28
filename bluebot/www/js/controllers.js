angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal) {
    
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/help.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeHelpModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // Open the login modal
  $scope.help = function() {
    $scope.modal.show();
  };
})

.controller('goalslistsCtrl', function($scope) {
  $scope.goalslists = [
    { title: 'Goal 1', id: 1 },
    { title: 'Goal 2', id: 2 },
    { title: 'Goal 3', id: 3 },
    { title: 'Goal 4', id: 4 },
    { title: 'Goal 5', id: 5 }
  ];
})

.controller('goalslistCtrl', function($scope, $stateParams) {
})

.controller('GraphCtrl', function ($scope) {

  $scope.chart = {
    options: {
      chart: {
        type: 'line'
      },
      legend: {
        enabled: false
      }
    },
    title: {
      text: "Hello World"
    },
    yAxis: {
      title: null
    },
    xAxis: {
      type: 'datetime'
    },
    series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
  };
});

