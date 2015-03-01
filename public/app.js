var app = angular.module('WhoBringsWhat', ['ngCookies', 'pascalprecht.translate', 'ui.router']);

app.config([
'$translateProvider',
'$translatePartialLoaderProvider',
function($translateProvider, $translatePartialLoaderProvider) {

  $translateProvider.determinePreferredLanguage();
  $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
  
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '/locales/{part}/{lang}.json'
  });

}]);

app.run(function ($rootScope, $translate) {
  $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
    $translate.refresh();
  });
});