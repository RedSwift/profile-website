angular.module('myApp')
  .component('projectPage', {
    templateUrl: 'project/project.template.html',
    controller: function ($scope, $http) {
      $http({
        method: 'GET',
        url: 'api/project'
      }).then(function success (res) {
        $scope.myProject = res.data
      }, function error (err) {
        console.log(err)
      })
    }
  })
