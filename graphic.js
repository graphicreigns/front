APP.controller('GraphicCtrl', ['$scope', '$location', '$cookieStore', '$http','$modal','localize',
function ($scope, $location, $cookieStore, $http, $modal, localize) {
           
   /*$scope.datatest = [
     {
      date: new Date("2014,03,24"),

      VieuxPlongeur: 102,
      Palanquee: 40,

      Decathlon: 27.13        
    },
    {
      date: new Date("2014,04,02"),
      VieuxPlongeur: 111,
      Palanquee: 200,
      Scubaland: 48.25,
      Decathlon: 25.13
    },
    {
      date: new Date("2014-04-07T22:00:00.000Z"),
      Palanquee: 30,
      VieuxPlongeur: 124,
      Scubaland: 41.71,
      Decathlon: 24
    }
  ]; 
  */

  /*
  $scope.serietest = [
    {
      y: "Palanquee",
      label: "Palanquee",
      color: "#324900",
      type: "line",
      thickness: "5px",
      dotSize: 2,
      id: "Palanquee",
      drawDots: true
    },
    {
      y: "Scubaland",
      label: "Scubaland",
      thickness: "5px",
      color: "#d55d5e",
      dotSize: 2,
      id: "Scubaland",
      drawDots: true
    },
    {
      y: "VieuxPlongeur",
      label: "VieuxPlongeur",
      color: "#7a1f20",
      thickness: "5px",
      dotSize: 2,
      id: "VieuxPlongeur",
      drawDots: true
    },
    {
      y: "Decathlon",
      label: "Decathlon",
      color: "#990099",
      type: "line",
      thickness: "5px",
      dotSize: 2,
      id: "Decathlon",
      drawDots: true
    }
  ]; */




  $scope.title="Gestion des graphiques";
  $scope.AddSellQuantity="";
  $scope.sites=[]; 
  $scope.users=[];
 // $scope.datas=[]; 
  $scope.datas=[];
  $scope.user = $cookieStore.get('userID_admin');
  $scope.dtfin= new Date();
  $scope.dtdebut= new Date($scope.dtfin.getTime()-(7*30*24*60*60*1000));
  $scope.dtc = new Date(); 
  $scope.lesseries = [];
  $scope.commentaires=[]; 
  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
  $scope.showWeeks = true;


  $scope.checkdate = function(){
   
      $http.post('/graphic/getstat_command',{"debut":$scope.dtdebut.getTime(), "fin":$scope.dtfin.getTime()}).success(function(data){
                 
          _.map(data,function(obj){ obj.date = new Date(obj.date);  });

          //$scope.datas=$scope.datatest;
          $scope.datas=data.reverse();//On reverse pour trier par date,du plus ancien au plus recent


          $http.post('/graphic/getsiteOptions').success(function(data){

              _.map(data,function(obj){   

                  obj.type = "line",
                  obj.thickness= "5px",
                  obj.dotSize= 2,
                  obj.drawDots= true,     
                  obj.visible = true,
                  obj.axis = "y";  

              });

              $scope.lesseries = [];
              var datalength = $scope.datas.length;
              var serielength = data.length;
              var hasFound = false;
              for(var i=0; i<serielength;++i){//for each serie
                  var serie = data[i];
                  hasFound = false;
                  for(var j=0; j<datalength && !hasFound; ++j){
                      var mydata = $scope.datas[j];
                      var datakeys = Object.keys(mydata);
                      if(_.contains(datakeys, serie.y)){
                          hasFound = true;
                          $scope.lesseries.push(serie);
                      }
                  }
              }



              $scope.options = {
                  lineMode: "cardinal",
                  tension: 0.7,
                  axes: {x: {key: "date", type: "date", ticks:9} }, 
                  //y: {key: "y",type: "linear"}},
                  tooltipMode: "dots",
                  stacks: [],
                  columnsHGap: 5,
                  series: $scope.lesseries.reverse(),
                  tooltip: 
                    {
                       mode: "scrubber", 
                       formatter: function(x, y, series) {
                          // on affiche la date format JJ/MM,AAAA   
                          var affiche_y= y;
                          console.log(affiche_y);  
                          var affiche_x=new Date(x); 
                          var retour = affiche_x.getDate()+"/"+(affiche_x.getMonth()+1)+"/";
                          retour += affiche_x.getFullYear() + " :" + affiche_y;

                          return retour;
                       }
                     }                 
              };
          }); 
      }); 
  };


   

  $scope.checkdatecomment = function(){
    $http.post('/graphic/getcommentaire',{"date":$scope.dtc.getTime(), "compte":$scope.UserSelect}).success(function(data){
      _.map(data,function(obj){ 
        obj.date_debut = new Date(obj.date_debut),
        obj.date_fin = new Date(obj.date_fin); 
      });
      $scope.commentaires=data;
   // console.log($scope.commentaires);
    });
  };      
  
  $scope.AddToData = function(){
    $http.post('/graphic/putstat_command',{"nb":$scope.NumberOfOrders,"date":$scope.dt.getTime(),"id_site": $scope.SiteSelect}).success(function(data){
      $scope.checkdate();
    });
  };  

  $scope.AddToComment = function() {
    $http.post('/graphic/putcommentaire',{"debut":$scope.dtdebutc.getTime(),"fin":$scope.dtfinc.getTime(), "compte":$scope.UserSelect, "contenu":$scope.Commentaire});
  }

  $scope.today = function() {
    return $scope.dt = new Date();
  };
  
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
    return $scope.minDate = ( ((_ref = $scope.minDate) != null) ? _ref : {  "null": new Date() } );
  };
     
  $scope.open1 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    return $scope.opened1 = true;
  };

  $scope.open2 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    return $scope.opened2 = true;
  };

  $scope.open3 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    return $scope.opened3 = true;
  };

  $scope.open4 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    return $scope.opened4 = true;
  };

  $scope.open5 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    return $scope.opened5 = true;
  };

  $scope.open6 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    return $scope.opened6 = true;
  };

  






  $http.post('/graphic/getsite').success(function(data){
        // console.log(data);
        $scope.sites=data;
        //_.map($scope.site,function(obj){obj.deleted=false});
      }); 

  $http.post('/graphic/getallcompte').success(function(data){
    $scope.users=data;
  });

  $scope.checkdate();

  $scope.today();
  
  $scope.toggleMin();


}]);
