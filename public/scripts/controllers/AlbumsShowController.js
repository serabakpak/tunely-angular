angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

AlbumsShowController.$inject = ['$http', '$routeParams'];

function AlbumsShowController ($http, $routeParams) {
  var vm = this;
  vm.newSong = {
    
  };


  $http({
    method: 'GET',
    url: '/api/albums/'+$routeParams.id
  }).then(function successCallback(json) {
    console.log(json.data);
    vm.album = json.data;

  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  })

  vm.createSong = function () {
    $http({
    method: 'POST',
    url: '/api/albums/' + vm.album._id + '/songs',
    data: vm.newSong
    }).then(function createSuccess(json) {
      console.log('posting json.data', json.data);
      vm.album.songs.push(json.data);
      vm.newSong = {};

    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);  
    })
  }

  vm.deleteSong = function(song) {
    $http({
      method: 'DELETE',
      url: '/api/albums/'+ $routeParams.id + '/songs/' + song._id
    }).then (function deleteSuccess(json) {
      console.log('deleting json', json);
      var index = vm.album.songs.indexOf(song);
      vm.album.songs.splice(index, 1); 
    }, function deleteError(response) {
      console.log('There an error deleting the data', response);
    })
  }

    vm.editSong = function(song) {
    $http({
      method: 'PUT',
      url: '/api/albums/'+ $routeParams.id + '/songs/' + song._id,
      data: song
    }).then (function editSuccess(json) {
      console.log('editing json', json);
    }, function editError(response) {
      console.log('There an error editing the data', response);
    })
  }

}