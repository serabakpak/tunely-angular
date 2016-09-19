angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);






AlbumsShowController.$inject = ['$http', '$routeParams'];
function AlbumsShowController (  $http,   $routeParams  ) {
  var vm = this;
  console.log($routeParams);

  $http({
    method: 'GET',
    url: '/api/albums/'+$routeParams.id  // how can we get the id? (hint: check console log from above)
  }).then(function successCallback(json) {
    vm.album = json.data;
  });
}