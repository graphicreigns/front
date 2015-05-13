APP.controller('GraphicCtrl', ['$scope', '$location', '$cookieStore', '$http','$modal','localize',
function ($scope, $location, $cookieStore, $http, $modal, localize) {
  $scope.title="Gestion des Graphics";
  $scope.AddSellQuantity="";
  $scope.sites=[]; 
  $scope.datas=[]; 
  $scope.datatests=[];
  $scope.user = $cookieStore.get('userID_admin');
  $scope.dtfin= new Date();
  $scope.dtdebut= new Date($scope.dtfin.getTime()-(7*30*24*60*60*1000));
  console.log($scope.dtdebut); 
  console.log($scope.dtfin);
  //console.log(_.size(data));
  //console.log(Object.keys($scope.datatests)); 
  


  $scope.checkdate = function() 
  {
    //console.log($scope.dtdebut); 
    $http.post('/graphic/getstat_command',{"debut":$scope.dtdebut.getTime(), "fin":$scope.dtfin.getTime()}).success(function(data){
   //console.log("length of data", _.size(data));
   _.map(data,function(obj){
    obj.date = new Date(obj.date);
   });

   $scope.datas=data;
    //$scope.datas=data;
    if(data.length>0){
       console.log(Object.keys($scope.datas[0]));     
    };

});
  };
  $scope.AddToData = function(){
    $http.post('/graphic/putstat_command',{"nb":$scope.NumberOfOrders,"date":$scope.dt.getTime(),"id_site": $scope.SiteSelect});

  } 

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
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];

//    $scope.formats = 'shortDate';
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
    $scope.datas_mans = [
  {
    date: new Date("2014,03,24"),
    Scubaland: 32.14,
    VieuxPlongeur: 102,
    Decathlon: 21.57,
    Palanquee: 45
  
  
  },
  {
    date: new Date("2014,04,02"),
    Scubaland: 48.25,
    VieuxPlongeur: 111,
    Decathlon: 25.13,
    Palaquee: 35


  },
  {
    date: new Date("2014-04-07T22:00:00.000Z"),
    Scubaland: 41.71,
    VieuxPlongeur: 124,
    Decathlon: 24,
    Palanquee: 30
  
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
      y: "Scubaland",
      label: "Scubaland",
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
      y: "VieuxPlongeur",
      label: "VieuxPlongeur",
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
      y: "Decathlon",
      label: "Decathlon",
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
      y: "Palanquee",
      label: "Palanquee",
      axis: "y",
      color: "#324900",
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
    // console.log(data);
     $scope.sites=data;
    //_.map($scope.site,function(obj){obj.deleted=false});
  }); 

$scope.checkdate();
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