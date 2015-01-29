angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    
        
 // Create the help modal that we will use later
  $ionicModal.fromTemplateUrl('templates/start.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    
  // Triggered in the help modal to close it
  $scope.closeNoDataModal = function() {
    window.location.assign('#/app/input-score');
    $scope.modal.hide();
  };
    
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
      $scope.modal.remove();
  });
  $scope.start = function() {
      if(window.localStorage['points'] == null){
              // Open the help modal
                $scope.modal.show();
                  
            }
  };        
  $timeout($scope.start, 500);
})


.controller('ScoresCtrl', function($scope, $localstorage, $ionicModal){
        
  // Create the help modal that we will use later
  $ionicModal.fromTemplateUrl('templates/help.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the help modal to close it
  $scope.closeHelpModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // Open the help modal
  $scope.help = function() {
    $scope.modal.show();
  };
    
    $scope.submitScores = function () {
        if(window.localStorage['points'] == null){
                $localstorage.setObject('points', {
                    goalscompleted: [],
                    score1: [],
                    score2: [],
                    score3: [],
                    score4: [],
                    date:[]
                })
        };
        
        //TODO: stop two entries in one day
        var date = new Date().toUTCString().slice(5, 16);
        
        var goals = Math.floor(Math.random()*4);
        
        var points=$localstorage.getObject('points');
        
        var slider1, slider2, slider3, slider4;
        if($scope.range1==null){slider1=50}else{slider1=parseInt($scope.range1)};
        if($scope.range2==null){slider2=50}else{slider2=parseInt($scope.range2)};
        if($scope.range3==null){slider3=50}else{slider3=parseInt($scope.range3)};
        if($scope.range4==null){slider4=50}else{slider4=parseInt($scope.range4)};
        
        $localstorage.setObject('points', {
            goalscompleted: points.goalscompleted.concat(goals),
            score1: points.score1.concat(slider1),
            score2: points.score2.concat(slider2),
            score3: points.score3.concat(slider3),
            score4: points.score4.concat(slider4),
            date: points.date.concat(date)
        })
        
        //TODO: fix this hack
        window.location.assign('#/app/graph');
        location.reload();
    };
    
})

.controller('GoalsCtrl', function($scope, $localstorage){
       /*if(window.localStorage['fullgoallist'] == null){
               $localstorage.setObject('fullgoallist', {
                    id:[0,1,2,3,4,5],
                    name:['Get out of bed', 'Have a shower', 'Go outside', 'Eat a healthy meal', 'Take a 10 minutes walk or jog'],
                    description:['a','b','c','d','e'],
                    category:[]
                })
        */
      var goals = $localstorage.getObject('fullgoallist');
    
    //TODO: how can I automate this?
      $scope.goalList = [
            { text: goals.name[0], checked: false },
            { text: goals.name[1], checked: false },
            { text: goals.name[2], checked: false },
            { text: goals.name[3], checked: false },
            { text: goals.name[4], checked: false }
          ]
})

.controller('GraphCtrl', function ($scope, $localstorage, $ionicModal, $timeout) {
    
    
    
        
 // Create the help modal that we will use later
  $ionicModal.fromTemplateUrl('templates/start2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    
  // Triggered in the help modal to close it
  $scope.closeNoGoalsModal = function() {
    window.location.assign('#/app/choose-goals');
    $scope.modal.hide();
  };
    
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
      $scope.modal.remove();
  });
  $scope.start = function() {
      if(window.localStorage['points'] != null && window.localStorage['goals'] == null){
              // Open the help modal
                $scope.modal.show();
                  
            }
  };        
  $timeout($scope.start, 500);
    
    // Create the help modal that we will use later
  $ionicModal.fromTemplateUrl('templates/help.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the help modal to close it
  $scope.closeHelpModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // Open the help modal
  $scope.help = function() {
    $scope.modal.show();
  };

    
    $scope.showSeriesToggle = function (seriesNum) {
        var seriesArray = $scope.highchartsNG.series;
        if (seriesArray[seriesNum].visible){
            seriesArray[seriesNum].visible=false;
        }else{
            seriesArray[seriesNum].visible=true;
        }
        
    }
    
    $scope.highchartsNG = {
        options: {
            colors: ['#191f2c', '#ff9d00', '#00982b','#6f97de', '#0054e3'],
            chart: {
                backgroundColor: '#2d3e65',
                
            },
            title:null,
            legend: {enabled: false},
        },
        xAxis: {
		gridLineColor: '#2d3e65',
		gridLineWidth: 1,
		labels: {
            maxStaggerLines:1,
            overflow: 'justify',
			style: {
				color: '#A0A0A0'
			}
		},           
        categories: []
	   },
        yAxis: [{ // Primary yAxis
            title: 'Goals completed',
            gridLineColor: '#2d3e65',
        }, { // Secondary yAxis
            gridLineColor: '#333333',
            labels: {enabled:false},
            title: 'Goals completed',
            opposite: true,
        }],
        tooltip: {
            formatter: function () {
    		  //  return '';
                this.x + ': ' + this.y;
            }
        },
        
        series: [{
            name: 'Goals completed',
            type: "bar",
            borderWidth:'0'
        },{
            name: '1',
            type: 'spline',
            visible:true,
            yAxis: 1
        },{
            name: '2',
            type: 'spline',
            visible:false,
            yAxis: 1
        },{
            name: '3',
            type: 'spline',
            visible:false,
            yAxis: 1
        }, {
            name: '4',
            type: 'spline',
            visible:false,
            yAxis: 1
        }]
    };
    
        var points = $localstorage.getObject('points');
        var seriesArray = $scope.highchartsNG.series
        seriesArray[0].data = points.goalscompleted;
        seriesArray[1].data = points.score1;
        seriesArray[2].data = points.score2;
        seriesArray[3].data = points.score3;
        seriesArray[4].data = points.score4;

        var xAxisArray = $scope.highchartsNG.xAxis
        xAxisArray.categories=points.date;

      
});

