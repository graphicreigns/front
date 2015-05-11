APP.controller('GraphicCtrl', ['$scope', '$location', '$cookieStore', '$http','$modal','localize',
function ($scope, $location, $cookieStore, $http, $modal, localize) {
	$scope.title="Gestion des Graphics";
	$scope.AddSellQuantity="";
  $scope.sites=[]; 
  $scope.user = $cookieStore.get('userID_admin');
	//$scope.AddToData =  function(){
	//	$http.post('/graphic/putstat_command',{"sellquantity":$scope.AddSellQuantity});	
	 $scope.today = function() {
        return $scope.dt = new Date();
      };
      $scope.today();
      $scope.showWeeks = true;
      $scope.toggleWeeks = function() {
        return $scope.showWeeks = !$scope.showWeeks;
      };
      $scope.clear = function() {
        return $scope.dt = null;
      };
      $scope.disabled = function(date, mode) {
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      };
      $scope.toggleMin = function() {
        var _ref;
        return $scope.minDate = (_ref = $scope.minDate) != null ? _ref : {
          "null": new Date()
        };
      };
      $scope.toggleMin();
      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return $scope.opened = true;
      };
      $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
      };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate']

//	  $scope.formats = 'shortDate';
  /*  $scope.sites = [
    {name: "palanque",
     id: 1
    },
     {name: "truc",
      id : 2
    },
     {name: "machin",
     id: 3
    }
      ];
  */
    $scope.datas = [
  {
    date: new Date("2014,03,24"),
    Palanquee: 32.14,
    Au_vieux_campeur: 102,
    Bubble_Diving: 21.57,
    Scubaland: 23.14 
  
  },
  {
    date: new Date("2014,04,02"),
    Palanquee: 48.25,
    Au_vieux_campeur: 111,
    Bubble_Diving: 25.13,
    Scubaland: 21.88

  },
  {
    date: new Date("2014-04-07T22:00:00.000Z"),
    Palanquee: 41.71,
    Au_vieux_campeur: 124,
    Bubble_Diving: 24,
    Scubaland: 25.14
  },
  {
    date: new Date("2014-04-13T22:00:00.000Z"),
    Palanquee: 44.50,
    Au_vieux_campeur: 135,
    Bubble_Diving: 31.33,
    Scubaland: 28.67
  },
  {
    date: new Date("2014-04-20T22:00:00.000Z"),
    Palanquee: 33.29,
    Au_vieux_campeur: 64,
    Bubble_Diving: 24.71,
    Scubaland: 18.57
  },
  {
    date: new Date("2014-04-29T22:00:00.000Z"),
    Palanquee: 51.11,
    Au_vieux_campeur: 69,
    Bubble_Diving: 29.56,
    Scubaland: 18.57
  },
  {
    date: new Date("2014-05-05T22:00:00.000Z"),
    Palanquee: 42.50,
    Au_vieux_campeur: 74,
    Bubble_Diving: 19.83,
    Scubaland: 19.33
  },
  {
    date: new Date("2014-05-12T22:00:00.000Z"),
    Palanquee: 73.14,
    Au_vieux_campeur: 94,
    Bubble_Diving: 41.75,
    Scubaland: 24.17
  },
  {
    date: new Date("2014-05-21T22:00:00.000Z"),
    Palanquee: 31,
    Au_vieux_campeur: 54,
    Bubble_Diving: 17.67,
    Scubaland: 34.14
  },
  {
    date: new Date("2014-06-01T22:00:00.000Z"),
    Palanquee: 48.45,
    Au_vieux_campeur: 75,
    Bubble_Diving: 26.91,
    Scubaland: 17.89


  },
  {
    date: new Date("2014-06-09T22:00:00.000Z"),
    Palanquee: 34.13,
    Au_vieux_campeur: 90,
    Bubble_Diving: 20.50,
    Scubaland: 19.45

  
  },
  {
    date: new Date("2014-06-16T22:00:00.000Z"),
    Palanquee: 52.43,
    Au_vieux_campeur: 41.71,
    Bubble_Diving: 35.43,
    Scubaland: 27.63  
   
  },
  {
    date: new Date("2014-06-23T22:00:00.000Z"),
    Palanquee: 41.71,
    Au_vieux_campeur: 107,
    Bubble_Diving: 22.57,
    Scubaland: 24.14
  },
  {
    date: new Date("2014-06-30T22:00:00.000Z"),
    Palanquee: 44,
    Au_vieux_campeur: 127,
    Bubble_Diving: 31,
    Scubaland: 21.29
  },
  {
    date: new Date("2014-07-07T22:00:00.000Z"),
    Palanquee: 59.57,
    Au_vieux_campeur: 139,
    Bubble_Diving: 36,
    Scubaland: 26.57 
  },
  {
    date: new Date("2014-07-14T22:00:00.000Z"),
    Palanquee: 51.71,
    Au_vieux_campeur: 109,
    Bubble_Diving: 25.86, 
    Scubaland: 25.57
   
  },
  {
    date: new Date("2014-07-27T22:00:00.000Z"),
    Palanquee: 40,
    Au_vieux_campeur: 105,
    Bubble_Diving: 22.38,
    Scubaland: 19
  },
  {
    date: new Date("2014-08-03T22:00:00.000Z"),
    Palanquee: 51.43,
    Au_vieux_campeur: 117,
    Bubble_Diving: 30.43,
    Scubaland: 20.08
  },
  {
    date: new Date("2014-08-06T22:00:00.000Z"),
    Palanquee: 42.33, 
    Bubble_Diving: 30.33,
    Scubaland: 21.29
  },
  {
    date: new Date("2014-08-08T22:00:00.000Z"),
    Palanquee: 49.50,
    Bubble_Diving: 27.50,
    Scubaland: 20.33
 
  },
  {
    date: new Date("2014-08-11T22:00:00.000Z"),
    Palanquee: 42.75,
    Au_vieux_campeur: 86,
    Bubble_Diving: 26,
    Scubaland: 21.50 

  },
  {
    date: new Date("2014-08-17T22:00:00.000Z"),
    Palanquee: 38.33,
    Au_vieux_campeur: 77, 
    Bubble_Diving: 26.33,
    Scubaland: 19.25
  },
  {
    date: new Date("2014-08-24T22:00:00.000Z"),
    Palanquee: 33,
    Au_vieux_campeur: 95, 
    Bubble_Diving: 23.57,
    Scubaland: 13.17
  },
  {
    date: new Date("2014-08-31T22:00:00.000Z"),
    Palanquee: 46,
    Au_vieux_campeur: 83,
    Bubble_Diving: 34.71,
    Scubaland: 15.86
 
  },
  {
    date: new Date("2014-09-05T22:00:00.000Z"),
    Palanquee: 35,
    Au_vieux_campeur: 81,
    Bubble_Diving: 14,
    Scubaland: 17.57
   
  },
  {
    date: new Date("2014-09-07T22:00:00.000Z"),
    Palanquee: 64,
    Bubble_Diving: 27,
    Scubaland: 17
  },
  {
    date: new Date("2014-09-08T22:00:00.000Z"),
    Palanquee: 35.17,
    Au_vieux_campeur: 81,
    Bubble_Diving: 29.83,
    Scubaland: 15
    
  },
  {
    date: new Date("2014-09-14T22:00:00.000Z"),
    Palanquee: 43.71,
    Au_vieux_campeur: 92,
    Bubble_Diving: 17.43,
    Scubaland: 25
  },
  {
    date: new Date("2014-09-21T22:00:00.000Z"),
    Palanquee: 33,
    Au_vieux_campeur: 83,
    Bubble_Diving: 12.57,
    Scubaland: 18.33
  },
  {
    date: new Date("2014-09-28T22:00:00.000Z"),
    Palanquee: 49.14,
    Au_vieux_campeur: 113,
    Bubble_Diving: 11.86, 
    Scubaland: 18.57
  }

];
$scope.options = {
  lineMode: "cardinal",
  tension: 0.7,
  axes: {x: {type: "date", key: "date", ticks:9}, 
  y: {type: "linear", key: "y"}},
  tooltipMode: "dots",
  drawLegend: true,
  drawDots: true,
  stacks: [],
  series: [
    {
      y: "Palanquee",
      label: "Palanqué",
      axis: "y",
      color: "#d55d5e",
      type: "line",
      thickness: "5px",
      dotSize: 2,
      id: "series_0",
      drawDots: true,
      lineMode: undefined
    },
    {
      y: "Au_vieux_campeur",
      label: "Au vieux campeur",
      color: "#7a1f20",
      axis: "y",
      type: "line",
      thickness: "5px",
      visible: true,
      dotSize: 2,
      id: "series_2",
      drawDots: true
    },
     {
      y: "Bubble_Diving",
      label: "Bubble Diving",
      axis: "y",
      color: "#990099",
      type: "line",
      thickness: "5px",
      dotSize: 2,
      id: "series_3",
      drawDots: true,
      lineMode: undefined
    },
     {
      y: "Scubaland",
      label: "Scubaland",
      axis: "y",
      color: "#2db41f",
      type: "line",
      thickness: "5px",
      dotSize: 2,
      id: "series_4",
      drawDots: true,
      lineMode: undefined
    }
  ], // on affiche la date format JJ/MM,AAAA   
  tooltip: {mode: "scrubber", formatter: function(x, y, series) {var affiche_x=new Date(x); 
    return affiche_x.getDate()+"/"+(affiche_x.getMonth()+1)+"/"+ affiche_x.getFullYear() + " :" + y;}},
  columnsHGap: 5
};
$http.post('/graphic/getsite').success(function(data){
    //console.log(data);
     $scope.sites=data;
    //_.map($scope.site,function(obj){obj.deleted=false});
  }); 
  /*
     $scope.datas = [
        {date: 0, value: 1 },
        {date: 1, value: 8},
        {date: 2, value: 15},
        {date: 3, value: 16},
        {date: 4, value: 23},
        {date: 5, value: 42}
	];

    //'$scope', function($scope) {
    $scope.options = {
    axes: {
      x: {key: 'date', labelFunction: function(value) {return value;}, type: 'linear', min: 0, max: 10, ticks: 2},
      y: {type: 'linear', min: 0, max: 1, ticks: 5},
      y2: {type: 'linear', min: 0, max: 1, ticks: [1, 2, 3, 4]}
    },
    series: [
      {y: 'value', color: 'steelblue', thickness: '2px', type: 'area', striped: true, label: 'Pouet'},
    ],
    lineMode: 'linear',
    tension: 0.7,
    tooltip: {mode: 'scrubber', formatter: function(x, y, series) {return 'pouet';}},
    drawLegend: true,
    drawDots: true,
    columnsHGap: 5
	};
  */
}]);
//http://bl.ocks.org/zanarmstrong/ca0adb7e426c12c06a95