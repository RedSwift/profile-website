angular.module('myApp')
  .component('skillPage', {
    templateUrl: 'skill/skill.template.html',
    controller: function ($scope, $http) {
      $http({
        method: 'GET',
        url: 'api/skill'
      }).then(function success (res) {
        $scope.mySkills = res.data
      }, function error (err) {
        console.log(err)
      })
    }
  })
