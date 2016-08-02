angular.module('myApp')
  .filter('unsafe', function ($sce) {
    return function (val) {
      return $sce.trustAsHtml(val)
    }
  })
  .component('profilePage', {
    templateUrl: 'profile/profile.template.html',
    controller: function ($scope, $http) {
      $http({
        method: 'GET',
        url: 'https://redswift.herokuapp.com/api/profile'
      }).then(function success (res) {
        $scope.myInfo = res.data
      }, function error (err) {
        console.log(err)
      })
    }
  })
