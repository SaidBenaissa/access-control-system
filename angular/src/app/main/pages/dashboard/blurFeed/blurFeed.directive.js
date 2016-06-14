/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.dashboard')
        .directive('blurFeed', blurFeed);

    /** @ngInject */
    function blurFeed() {
        return {
            restrict: 'E',
            controller: 'BlurFeedCtrl',
            controllerAs: 'vm',
            templateUrl: 'app/main/pages/dashboard/blurFeed/blurFeed.html'
        };
    }
})();