(function () {
  'use strict';

  angular
    .module('angular')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $locationProvider, $authProvider, DEBUG, apiBase) {
    // Enable log
    $logProvider.debugEnabled(DEBUG);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // Remove ugly # from URLs
    $locationProvider.html5Mode(true);

    // Set login URL
    $authProvider.loginUrl = apiBase + 'api-token-auth';
  }

})();
