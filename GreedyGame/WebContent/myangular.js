/**
 * 
 */

  var app=angular.module("musicApp",['ngRoute']);
  app.config(function ($routeProvider) {
      $routeProvider.
      when('/home', {
          templateUrl: 'embedded.musictrack.html',
          controller: 'musicCtrl',
          activetab: 'home'
      }).
      when('/musictrack', {
          templateUrl: 'embedded.musictrack.html',
          controller: 'musicCtrl',
          activetab: 'musictrack'
      }).
      when('/musictrack/:page', {
          templateUrl: 'embedded.musictrack.html',
          controller: 'musicCtrl',
          activetab: 'musictrack'
      }).
      when('/trackgenres', {
          templateUrl: 'embedded.trackgenres.html',
          controller: 'genresCtrl',
          activetab: 'trackgenres'
      }).
      when('/trackgenres/:page', {
          templateUrl: 'embedded.trackgenres.html',
          controller: 'genresCtrl',
          activetab: 'trackgenres'
      }).
      when('/addgene', {
          templateUrl: 'embedded.genresForm.html',
          controller: 'genresCtrl',
          activetab: 'trackgenres'
      }).
      when('/addgene/:id', {
          templateUrl: 'embedded.genresForm.html',
          controller: 'genresCtrl',
          activetab: 'trackgenres'
      }).
      when('/addNewTrack', {
          templateUrl: 'embedded.newTrackForm.html',
          controller: 'addMusicCtrl',
          activetab: 'trackgenres'
      }).
      when('/addNewTrack/:id', {
          templateUrl: 'embedded.newTrackForm.html',
          controller: 'addMusicCtrl',
          activetab: 'musictrack'
      }).
      
      otherwise({
          redirectTo: '/home'
      });
  });
  
  app.controller("HomeController",function($scope)
		  {
	  			$scope.check="poinnnn";
	  			
		  });
  
  app.controller("HeaderController",['$scope','$route',function($scope,$route)
	{
	  $scope.$route=$route;
	}]);	  
  
  app.controller("musicCtrl",['$scope','dataFactory','$location','$routeParams',function($scope,dataFactory,$location,$routeParams)
		  {
			  $scope.count;
			  $scope.next;
			  $scope.previous;
			  $scope.results;
			  $scope.newTrack;
			  $scope.newTrackForm={};
			  $scope.currentPage;
			  $scope.filterValue;
			 
			  $scope.searchCall=function()
			  {
				console.log($scope.filterValue); 
				var promise = dataFactory.getfilteredData($scope.filterValue);
	  			//console.log(filterValue);
	  			promise.then(function (response) {
	  				$scope.res=response.data;
		  			$scope.count=response.data.count;
		  			$scope.next=response.data.next;
		  			$scope.previous=response.data.previous;
		  			$scope.results=response.data.results;
		  			if($scope.count>0)
		  				$scope.Message = "Search Result";
		  			else
		  				$scope.Message="Not Found"
	  	        }, function (err) {
	  	            $scope.Message = "Not Found";
	  	        });
				
				
			  };
			  var urlPage=$routeParams.page;
			  
			  if(urlPage!=null && urlPage!="")
				  {
				  	$scope.currentPage=parseInt(urlPage);
					
					
				  }
			  
			  else
				  {
						  $scope.currentPage = 0;
						 
				  	
				  }
	  		getMusicTrack($scope.currentPage);
	  		
	  		function getMusicTrack(page)
	  		{
	  			
	  			dataFactory.getMusicTrack(page).then(function success(response)
	  			{
	  				$scope.res=response.data;
		  			$scope.count=response.data.count;
		  			$scope.next=response.data.next;
		  			$scope.previous=response.data.previous;
		  			$scope.results=response.data.results;
	  			});
	  			
	  			
	  			
	  		
	  			
	  		}
	  		$scope.addNewTrack=function()
	  		{
	  			$location.url("/addNewTrack");
	  			
	  		};
	  		
	  		$scope.gerFilteredData = function () {
	  		
	  				
	  			/*console.log("called");
	  			var promise = dataFactory.getfilteredData($scope.filterValue);
	  			console.log(filterValue);
	  			promise.then(function (response) {
	  				$scope.res=response.data;
		  			$scope.count=response.data.count;
		  			$scope.next=response.data.next;
		  			$scope.previous=response.data.previous;
		  			$scope.results=response.data.results;
	  	            $scope.Message = "Search Result";
	  	        }, function (err) {
	  	            $scope.Message = "Not Found";
	  	        });*/
	  		};
	  		
	  		
	  		$scope.edit=function(id)
	  		{
	  				//alert(id);
	  				$location.url('/addNewTrack/'+id);
	  		};
	  		
	  		$scope.pageCount=function()
	  		{
	  			return Math.ceil($scope.count/20)-1;
	  		};
	  		$scope.range = function() {

	  			 var rangeSize = 4;
				
	  			 var ps = [];

	  			 var start;

	  			 start = $scope.currentPage;

	  			 if ( start > $scope.pageCount()-rangeSize ) {

	  			  start = $scope.pageCount()-rangeSize+1;

	  			  }

	  			 for (var i=start; i<start+rangeSize; i++) {
				if(i>=0)
	  			 	ps.push(i);

	  			}

	  			return ps;

	  			};
	  		
	  			$scope.prevPage = function() {

	  				if ($scope.currentPage > 0) {

	  					$scope.currentPage--;

	  				}
	  				
	  				$location.url('/musictrack/'+($scope.currentPage+1));
	  				
	  				};
	  				$scope.DisablePrevPage = function() {

	  					return $scope.currentPage === 0 ? "disabled" : "";

	  					};
	  					$scope.nextPage = function() {
	  						$scope.currentPage++;
	  						
	  						$location.url('/musictrack/'+($scope.currentPage+1));
	  						};
	  						$scope.DisableNextPage = function() {

	  							return $scope.currentPage === $scope.pageCount() ? "disabled" : "";

	  							};
	  							$scope.setPage = function(n) {

	  								$scope.currentPage = n;
	  								$location.url('/musictrack/'+($scope.currentPage+1));

	  								};
	  		
	  		
	  		
	  		
	  		
	  		
	  		
		  }]);
  
  
  
  app.controller("addMusicCtrl",['$scope','dataFactory','$location','$routeParams',function($scope,dataFactory,$location,$routeParams)
	  {
		  $scope.count;
		  $scope.next;
		  $scope.previous;
		  $scope.results;
		  $scope.newTrack;
		  $scope.genresCount;
		  $scope.diffPageTrack
		  $scope.newTrackForm={};
		  var trackId=$routeParams.id;
  		getMusicTrackGenres();
  		
  		function getMusicTrackGenres()
  		{
  			
  			if(trackId!="" && trackId!=null)
  				{
  					
  					dataFactory.getTrackById(trackId).then(function success(response){
  					//console.log(response.data);
  					console.log(response.data.id);
  					$scope.newTrackForm={"id":response.data.id,
  							"title":response.data.title,
  							"rating":response.data.rating
  							}; 
  					
  					
  					
  				});
  				}
  			else
  				$scope.newTrackForm={};
  			dataFactory.getTrackGenreMusic().then(function success(response)
  			{
  				//$scope.res=response.data;
	  			//$scope.count=response.data.count;
	  			//$scope.next=response.data.next;
	  			//$scope.previous=response.data.previous;
	  			$scope.newTrack=response.data.results;
	  			$scope.genresCount=Math.ceil((response.data.count)/20);
	  			console.log($scope.genresCount);
	  			//for()
	  			for(i=2;i<=$scope.genresCount;i++)	{
	  		   dataFactory.getTrackGenreAll(i).then(function success(response)
	  		   {
	  			   $scope.diffPageTrack=response.data.results;
	  			   
	  		   
	  		   for(i in $scope.diffPageTrack)
	  			   {
	  			   		
	  			   		$scope.newTrack.push({
	  			   			"id":$scope.diffPageTrack[i].id,
	  			   			"name":$scope.diffPageTrack[i].name
	  			   		});
	  			   }
	  		 });
  			}
	  			
  			});
  		
  			
  		}
  		
  		$scope.submitNewTrackForm=function()
  		{
  			if($scope.newTrackForm.id==undefined || $scope.newTrackForm.id==null)
				{
  				dataFactory.addNewTrackForm($scope.newTrackForm).then(function success(response)
  				{
  					$location.url('/musicTrack');
  				});
				}
  			else
  				{
	  				dataFactory.EditTrackForm($scope.newTrackForm).then(function success(response)
	  				{
	  					$location.url('/musicTrack');
	  				});
  				}
  		};
  		
  		
	  }]);
  
  
  
  
  
  
  app.controller("genresCtrl",['$scope','dataFactory','$location','$routeParams','$route' ,function($scope,dataFactory,$location, $routeParams,$route)
	  {
		  $scope.count;
		  $scope.next;
		  $scope.previous;
		  $scope.results;
		  $scope.open = false;
		  $scope.currentPage;
		  var genresId = $routeParams.id;
		 
		  var urlPage=$routeParams.page;
		  
		  if(urlPage!=null && urlPage!="")
			  {
			  	$scope.currentPage=parseInt(urlPage);
				
				
			  }
		  
		  else
			  {
					  $scope.currentPage = 0;
					 
			  	
			  }
			  
  		getTrackGenre($scope.currentPage);
  		
  		function getTrackGenre(page)
  		{
  			//$route.reload();
  			console.log(page);
  			dataFactory.getTrackGenre(page).then(function success(response)
  			{
  				$scope.res=response.data;
	  			$scope.count=response.data.count;
	  			$scope.next=response.data.next;
	  			$scope.previous=response.data.previous;
	  			$scope.results=response.data.results;
  			});
  			
  		}
  		
  		$scope.addGenres=function()
  		{
  			
  			$location.url('/addgene');
  		};
  		$scope.genres={};
  		if(genresId!=" " && genresId!=null)
  			{
  				//alert("undefine check");
  				dataFactory.getGenresById(genresId).then(function success(response){
  					console.log(response.data);
  					$scope.genres={"id":response.data.id,
  							"name":response.data.name};
  					
  					
  					
  				});
  				
  			}
  		else
  			{
  				//alert("define");
  				$scope.genres= {};
  			}
  		$scope.submitGenresForm=function()
  		{
  			if($scope.genres.id==undefined || $scope.genres.id==null)
  				{
  					dataFactory.addGenres($scope.genres).then(function success(response)
  					{
  						
  						$location.url('/trackgenres');
  					});
  				}
  			else
  				{
  				dataFactory.EditGenres($scope.genres).then(function success(response)
					{
						
						$location.url('/trackgenres');
					});
  				}
  			
  		};
  		$scope.edit=function(id)
  		{
  				//alert(id);
  				$location.url('/addgene/'+id);
  		};
  		$scope.pageCount=function()
  		{
  			return Math.ceil($scope.count/20)-1;
  		};
  		$scope.range = function() {

  			 var rangeSize = 4;

  			 var ps = [];

  			 var start;

  			 start = $scope.currentPage;

  			 if ( start > $scope.pageCount()-rangeSize ) {

  			  start = $scope.pageCount()-rangeSize+1;

  			  }

  			 for (var i=start; i<start+rangeSize; i++) {

  			 ps.push(i);

  			}

  			return ps;

  			};
  		
  			$scope.prevPage = function() {

  				if ($scope.currentPage > 0) {

  					$scope.currentPage--;

  				}
  				
  				$location.url('/trackgenres/'+($scope.currentPage+1));
  				
  				};
  				$scope.DisablePrevPage = function() {

  					return $scope.currentPage === 0 ? "disabled" : "";

  					};
  					$scope.nextPage = function() {
  						$scope.currentPage++;
  						
  						$location.url('/trackgenres/'+($scope.currentPage+1));
  						};
  						$scope.DisableNextPage = function() {

  							return $scope.currentPage === $scope.pageCount() ? "disabled" : "";

  							};
  							$scope.setPage = function(n) {

  								$scope.currentPage = n;
  								$location.url('/trackgenres/'+($scope.currentPage+1));

  								};
  		
	  }]);

  app.filter('pagination', function()
		  {
		    return function(input, start) {
		      start = parseInt(start, 10);
		      return input.slice(start);
		    };
		  });
  
  app.directive('starRating', function () {
	    return {
	        restrict: 'A',
	        template: '<ul class="rating">' +
	            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
	            '\u2605' +
	            '</li>' +
	            '</ul>',
	        scope: {
	            ratingValue: '=',
	            max: '=',
	            onRatingSelected: '&'
	        },
	        link: function (scope, elem, attrs) {

	            var updateStars = function () {
	                scope.stars = [];
	                for (var i = 0; i < 5; i++) {
	                    scope.stars.push({
	                        filled: i < scope.ratingValue
	                    });
	                }
	            };

	            

	            scope.$watch('ratingValue', function (oldVal, newVal) {
	                if (newVal) {
	                    updateStars();
	                }
	            }); 
	        }
	    }
	});
  
  
  app.factory('dataFactory',function($http)
		  {
	  			var urlBase="http://104.197.128.152:8000/v1/tracks";
	  			var dataFactory = {};
	  			dataFactory.getMusicTrack=function(page)
	  			{
	  				if(page==1 || page==0)
	  				 return $http.get("http://104.197.128.152:8000/v1/tracks");
	  				else
	  					return $http.get("http://104.197.128.152:8000/v1/tracks?page="+page);
	  			};
	  			dataFactory.getTrackGenreMusic=function()
	  			{
	  				
	  					return $http.get("http://104.197.128.152:8000/v1/genres");
	  				
	  			};
	  			dataFactory.getTrackGenre=function(page)
	  			{
	  				if(page==1 || page==0)
	  					return $http.get("http://104.197.128.152:8000/v1/genres");
	  				else
	  					return $http.get("http://104.197.128.152:8000/v1/genres?page="+page);
	  			};
	  			dataFactory.addGenres=function(genres){
	  				console.log(genres);
	  				return $http.post("http://104.197.128.152:8000/v1/genres",genres);
	  			};
	  			dataFactory.getGenresById=function(genresId){
	  				console.log(genresId);
	  				return $http.get("http://104.197.128.152:8000/v1/genres/"+genresId);
	  			};
	  			dataFactory.getTrackById=function(trackId){
	  				
	  				return $http.get(" http://104.197.128.152:8000/v1/tracks/"+trackId);
	  			};
	  			dataFactory.getfilteredData=function(filterValue)
	  			{
	  				return $http.get("http://104.197.128.152:8000/v1/tracks?title="+filterValue);
	  			};
	  			dataFactory.EditGenres=function(genres){
	  				//console.log(genres);
	  				return $http.post("http://104.197.128.152:8000/v1/genres/"+genres.id,genres);
	  			};
	  			dataFactory.EditTrackForm=function(newTrack){
	  				//console.log(genres);
	  				return $http.post("http://104.197.128.152:8000/v1/tracks/"+newTrack.id,newTrack);
	  			};
	  			
	  			dataFactory.getTrackGenreAll=function(page)
	  			{
	  				if(page==1)
	  					urlBase="http://104.197.128.152:8000/v1/genres";
	  				else
	  					urlBase="http://104.197.128.152:8000/v1/genres?page="+page;
	  				return $http.get(urlBase);
	  			};
	  			dataFactory.addNewTrackForm=function(newTrack){
	  				//console.log(genres);
	  				return $http.post("http://104.197.128.152:8000/v1/tracks",newTrack);
	  			};
	  			
	  			return dataFactory;
		  });
  
  
  
  
  
  
  
 