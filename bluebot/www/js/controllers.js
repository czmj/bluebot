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
        colors: ['#191f2c', '#ff9d00', '#2d7bff', '#00982b','#0348be'],
        chart: {
            backgroundColor: '#2d3e65',
        },
        legend: {
            enabled: false,
        },
    },
    title: {
      text: null
    },
    
	xAxis: {
		gridLineColor: '#333333',
		gridLineWidth: 1,
		labels: {
			style: {
				color: '#A0A0A0'
			}
		},
		lineColor: '#A0A0A0',
		tickColor: '#A0A0A0',
	},
	yAxis: {
		gridLineColor: '#333333',
		labels: {
			style: {
				color: '#A0A0A0'
			}
		},
		lineColor: '#A0A0A0',
		minorTickInterval: null,
		tickColor: '#A0A0A0',
		tickWidth: 1,
		title: null
	},
    series: [{
            name: 'Goals completed',
            data: [12, 13, 14, 13, 15, 8, 9, 5],
            type: "bar",
            borderWidth:'0',
        },{
            name: 'score1',
            data: [4, 5, 8, 7, 6, 7, 8, 9],
            type: 'spline'
        },{
            name: 'score2',
            data: [3, 5, 6, 5, 4, 5, 6, 7],
            type: 'spline',
        }, 
        /*{
            name: 'score3',
            data: [8, 7, 5, 7.0, 8, 9, 9, 10],
            type: 'spline'
        }, {
            name: 'score4',
            data: [12, 9, 7.0, 6.6, 5, 6, 7, 8],
            type: 'spline'
        }*/
        ]
    };
             
});

