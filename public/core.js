angular.module('myApp', ['ngRoute', 'ngMaterial'])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .dark()
      // .primaryPalette('blue')
      // .accentPalette('orange')
  })
