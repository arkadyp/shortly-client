var shortlyApp = angular.module("shortlyApp", ['ngRoute'])
.config(function($routeProvider){
  $routeProvider
    .when('/', {
      controller: 'LinksController',
      templateUrl: 'client/templates/home.html'
    })
    .when('/create', {
      controller: 'CreateLinkController',
      templateUrl: 'client/templates/createLink.html'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.controller('FrameController', function($scope, $http, $location){

})

.controller('LinksController', function($scope, $http){
  $http({
    method: 'GET',
    url: '/links'
  })
  .then(function(result){
    $scope.links = result.data;
    _.each($scope.links, function(link){
      link.sortingTitle = link.title.toLowerCase().trim();
      if(link.lastclicked === null) {
        link.lastclicked = -1;
      }
    });
  });

  $scope.displayOptions = {
    reverse: true,
    orderBy: 'visits'
  };

  $scope.getLastClicked = function(lastclicked){
    if(lastclicked !== -1){
      return new Date(Number(lastclicked) * 1000).toLocaleString();
    } else {
      return 'not visited';
    }
  };
})

.controller('CreateLinkController', function($scope, $http){
  $scope.linkText = "";

  $scope.shortenUrl = function(){
      $http({
        method: 'POST',
        url: '/links',
        data: {url: $scope.linkText}
      })
      .success(function(data, status, headers, config){
        console.log('posted new link');
      })
      .error(function(data, status, headers, config){
        console.log('error posting link');
      });


      // var link = new Shortly.Link( {url: $scope.linkText} );
      // link.save();
      $scope.linkText = "";
      // link.on('request', this.startSpinner, this);
      // link.on('sync',    this.success,      this );
      // link.on('error',   this.failure,      this );

    };
});





