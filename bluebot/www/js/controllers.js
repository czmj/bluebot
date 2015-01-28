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
});
