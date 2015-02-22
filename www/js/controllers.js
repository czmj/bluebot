angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope) {
})
    
.controller('MedsCtrl', function($scope){
    if(window.localStorage['meds'] == null){
        $scope.meds=[
            {
                name:1,
            },{
                name:2,
            },{
                name:3,
            }];
        window.localStorage['meds'] = JSON.stringify($scope.meds);
    }
})

.controller('ScoresCtrl', function($scope, $ionicModal){
    //have succesfully got to the input page! (somehow)
    if(window.localStorage['tutorial']==null || window.localStorage['tutorial']==0) window.localStorage['tutorial']=1;
    
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
        //if points does not exist, create an empty object
        if(window.localStorage['points'] == null){
                $scope.points={
                    goalscompleted: [],
                    score1: [],
                    score2: [],
                    score3: [],
                    score4: [],
                    date:[]
                }
                //push to local storage db
                window.localStorage['points'] = JSON.stringify($scope.points);
          
        }else{
            //if ponts does exist, load it from the db   
            $scope.points=JSON.parse(window.localStorage['points']);
        };
       // console.log($scope.points.date[0])
        //generate random goals completed - TODO: get actual goals completed
        $scope.goals = Math.floor(Math.random()*4);
        
        //get values from the input sliders
        if($scope.range1==null){$scope.slider1=50}else{$scope.slider1=parseInt($scope.range1)};
        if($scope.range2==null){$scope.slider2=50}else{$scope.slider2=parseInt($scope.range2)};
        if($scope.range3==null){$scope.slider3=50}else{$scope.slider3=parseInt($scope.range3)};
        if($scope.range4==null){$scope.slider4=50}else{$scope.slider4=parseInt($scope.range4)};
        $scope.date = new Date().toUTCString().slice(5, 16);
        
        function pushScores(){
            //add new values to points object
            $scope.points.goalscompleted.push($scope.goals);        
            $scope.points.score1.push($scope.slider1);
            $scope.points.score2.push($scope.slider2);
            $scope.points.score3.push($scope.slider3);
            $scope.points.score4.push($scope.slider4);
            $scope.points.date.push($scope.date);
            
            //save to local storage db
            window.localStorage['points'] = JSON.stringify($scope.points);
            window.location.assign('#/app/choose-goals');
        }
        
        //if most recent's entry date==today's date, confirm multiple submits in one day.
        if ($scope.date===$scope.points.date[$scope.points.date.length-1]){
            if(confirm("You have already created one log today. Do you want to create another?")){
                pushScores();
            }
        }else{
            pushScores();
        }
        
        
    };
    
})

.controller('GraphCtrl', function ($scope, $ionicModal, $timeout) {

    
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
            window.localStorage['tutorial'] = 1;
        }else if (index==3){
            //submit on start2
            $scope.start2.hide();
            window.location.assign('#/app/choose-goals');
            window.localStorage['tutorial'] = 9;
        }
    }
        
    $scope.skip = function(index) {   
             if(index==1){
                $scope.start.hide();
                window.localStorage['tutorial'] = 9;
            }else if(index==2){
                $scope.start2.hide();
                window.localStorage['tutorial'] = 9;
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
        $scope.points = window.localStorage['points'];
        $scope.seriesArray = $scope.highchartsNG.series
        seriesArray[0].data = points.goalscompleted;
        seriesArray[1].data = points.score1;
        seriesArray[2].data = points.score2;
        seriesArray[3].data = points.score3;
        seriesArray[4].data = points.score4;

        var xAxisArray = $scope.highchartsNG.xAxis
        xAxisArray.categories=points.date;
})


.controller('GoalsCtrl', function($scope, $ionicModal){
    if(window.localStorage['goals'] == null){
                $scope.goals=[
                    { 
                        id:1,
                        title: 'Get out of bed',
                        description: 'If you achieve this, give yourself a big pat on the back. It\'s the first step to a great day!',
                        focus:0,
                        completed:0
                    },{ 
                        id:2,
                        title: 'Take a shower or bath',
                        description: 'Having a wash can help you feel better about yourself, and it\'s also a great way to relax.',
                        focus:0,
                        completed:0
                    },{ 
                        id:3,
                        title: 'Take medication' ,
                        description: 'If your doctor has prescribed you medication, it\'s important to take it',
                        focus:0,
                        completed:0
                    },{ 
                        id:4,
                        title: 'Eat a healthy meal' ,
                        description: 'If you\'re struggling, ask a friend for help preparing a meal.',
                        focus:0,
                        completed:0
                    },{ 
                        id:5,
                        title: 'Meditate' ,
                        description: 'Meditation can help you sleep better, focus better and reduce stress. If you find it difficult, start with just a few minutes.',
                        focus:0,
                        completed:0
                    },{ 
                        id:6,
                        title: 'Go for a walk' ,
                        description: 'Walking releases endorpins, and can give you some time to think and reframe situations more optimistically.',
                        focus:0,
                        completed:0
                    },{ 
                        id:7,
                        title: 'Write in a journal' ,
                        description: 'Journalling can give you an outlet for feelings, and can help you to find the underlying reasons.',
                        focus:0,
                        completed:0
                    },{ 
                        id:8,
                        title: 'Do breathing exercises' ,
                        description: 'Breathing deeply gets more oxygen into your body and releases tension, and you can do it anytime or anywhere.',
                        focus:0,
                        completed:0
                    },{ 
                        id:9,
                        title: 'Listen to relaxing music' ,
                        description: 'If you\'re struggling, ask a friend for help preparing a meal.',
                        focus:0,
                        completed:0
                    }
                ]
                
        window.localStorage['goals'] = JSON.stringify($scope.goals);
        }else{
            $scope.goals=JSON.parse(window.localStorage['goals']);
        }
    
    $scope.submitGoals = function () {
    }
    
    
    
    // new goal modal
    $ionicModal.fromTemplateUrl('new-goal.html', {
      id: '1', // id is referenced by openModal()
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.goalModal = modal;
    });
    
    // help modal
    $ionicModal.fromTemplateUrl('templates/choose-goals-help.html', {
      id: '2',
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.help = modal;
    });


    $scope.openModal = function(index) {
        if (index==1) $scope.goalModal.show();
        else if (index == 2) $scope.help.show();
    };
    
    $scope.closeModal = function(index) {
        console.log(index)
        if(index == 1) $scope.goalModal.hide()
        else if (index = 2) $scope.help.hide();
    }
    
    
  // Called when the new-goal form is submitted
  $scope.creategoal = function(goal) {
    $scope.goals.push({
        id: $scope.goals.length+1,
        title: goal.title,
        description: goal.description,
        focus: 0,
        completed: 0,
    });
    
    //push this to local storage
    window.localStorage['goals'].concat({
        id: $scope.goals.length+1,
        title: goal.title,
        description: goal.description,
        focus: 0,
        completed: 0,
    });
      
    $scope.goalModal.hide();
    console.log($scope.goals);
  };
    
})


.controller('SettingsCtrl', function($scope){
    $scope.resetTutorial = function() { 
        if(confirm("Do you want to reset all tutorials?")){
            window.localStorage['tutorial'] = 0;
        }
    }
    $scope.deleteScores = function() { 
        if(confirm("Do you want to delete all logs?")){
            $scope.points = {
                    goalscompleted: [],
                    score1: [],
                    score2: [],
                    score3: [],
                    score4: [],
                    date:[]
                }
            window.localStorage['points'] = JSON.stringify($scope.points);
            location.reload();
        }
    }
});