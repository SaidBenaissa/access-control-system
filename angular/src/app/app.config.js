/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
    'use strict';

    angular.module('AccessControlSystem')
        .config(config);

    /** @ngInject */
    function config($locationProvider, $authProvider, apiBase, $logProvider, $urlRouterProvider, DEBUG) {

        $locationProvider.html5Mode(true);
        //baConfigProvider.changeTheme({blur: true});
        //
        //baConfigProvider.changeColors({
        //  default: 'rgba(#000000, 0.2)',
        //  defaultText: '#ffffff',
        //  dashboard: {
        //    white: '#ffffff',
        //  },
        //});

        // Set login URL
        $authProvider.loginUrl = apiBase + 'auth/login';

        $logProvider.debugEnabled(DEBUG);

        $urlRouterProvider.otherwise('/dashboard');
    }
})();
