/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.sockets')
        .directive('switch', switchDirective);

    /** @ngInject */
    function switchDirective($timeout) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '=',
                ngChange: '&'
            },
            template: function (el, attrs) {
                return '<div class="switch-container ' + (attrs.color || '') + '"><input type="checkbox" ng-model="ngModel" ng-change="ngChange"></div>';
            },
            link: function (scope, elem, attr) {
                $timeout(function () {
                    scope.color = attr.color;
                    var input = $(elem).find('input');
                    input.bootstrapSwitch({
                        size: 'small',
                        onColor: attr.color
                    });
                    input.on('switchChange.bootstrapSwitch', function (event, state) {
                        scope.ngModel = state;
                        scope.$apply();
                        if (scope.ngChange) {
                            scope.ngChange();
                        }
                    });
                });
            }
        };
    }
})();