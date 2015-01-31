angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope) {
})
    


.controller('ScoresCtrl', function($scope, $localstorage, $ionicModal){
    //have succesfully got to the input page! (somehow)
    if(window.localStorage['tutorial']==null || window.localStorage['tutorial']==0) $localstorage.setObject('tutorial',1);
    
  // hints help modal
  $ionicModal.fromTemplateUrl('templates/help.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    
  $scope.closeModal = function(index) {
    if (index==1) $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

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
        
        //TODO: Maybe? Stop two entries in one day. Or ask to confirm.
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
        
        //TODO: Graph doesn't refresh on first submit of scores - location.reload() solves this but it's ugly and hacky
        window.location.assign('#/app/graph');
        location.reload();
    };
    
})

.controller('GoalsCtrl', function($scope, $localstorage){
})

.controller('GraphCtrl', function ($scope, $localstorage, $ionicModal, $timeout) {

    
    // help modal
    $ionicModal.fromTemplateUrl('templates/help.html', {
      id: '1', // id is referenced by openModal()
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.help = modal;
    });
    
    // tutorial modal 1
    $ionicModal.fromTemplateUrl('templates/start.html', {
      id: '2',
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.start = modal;
    });
    
    // tutorial modal 2
    $ionicModal.fromTemplateUrl('templates/start2.html', {
      id: '3',
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.start2 = modal;
    });

    $scope.openModal = function(index) {
        if(index == 1) $scope.help.show();
        else if (window.localStorage['tutorial'] == null || window.localStorage['tutorial'] == 0) $scope.start.show();
        else if (window.localStorage['tutorial'] == 1) $scope.start2.show();
    };
    
    $scope.closeModal = function(index) {
        console.log(index)
        if(index == 1){ 
            $scope.help.hide()
        }else if (index = 2){
            //submit on start1
            $scope.start.hide();
            window.location.assign('#/app/input-score');
            $localstorage.setObject('tutorial',1);
        }else if (index==3){
            //submit on start2
            //TODO: there's a bug here - index is correct but nothing below here is running - seems to be running index==2 instead
            $scope.start2.hide();
            //console.log('hidden')
            window.location.assign('#/app/choose-goals');
            //console.log('window assigned')
            $localstorage.setObject('tutorial',9);
        }
    }
        
    $scope.skip = function(index) {   
             if(index==1){
                $scope.start.hide();
                $localstorage.setObject('tutorial',9)
            }else if(index==2){
                $scope.start2.hide();
                $localstorage.setObject('tutorial',9)
            }
        }

    
    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope 
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
      $scope.help.remove();
      $scope.start.remove();
      $scope.start2.remove();

    })

            
  $timeout($scope.openModal, 800);
  
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
            colors: ['#20252e', '#ff9d00', '#00982b','#6f97de', '#0054e3'],
            chart: {
                backgroundColor: '#394f64',
                alignTicks:false,
                height:320,
            },
            title:null,
            legend: {enabled: false},
            tooltip:{enabled:false},
        },
        xAxis: {
		gridLineWidth: 0,
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
            title: {text: 'Goals completed'},
            gridLineColor: '#333333',
            tickPositions:[0,1,2,3],
        }, { // Secondary yAxis
            title: {text: 'Mood'},
            gridLineWidth:0,
            labels: {enabled:false},
            opposite: true,
        }],
        
        series: [{
            name: 'Goals completed',
            type: "bar",
            borderWidth:'1',
            borderColor:'#2d3e65',
            pointPadding: 1,
            groupPadding: 1  
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

