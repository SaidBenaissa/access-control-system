/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin')
        .config(config);

    /** @ngInject */
    function config(baConfigProvider, colorHelper, $locationProvider, $authProvider, apiBase) {
        
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
        $authProvider.loginUrl = apiBase + 'auth/api-token-auth';

    }
})();