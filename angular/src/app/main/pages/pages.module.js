/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages', [
        'ui.router',

        'AccessControlSystem.main.pages.dashboard',
        'AccessControlSystem.main.pages.ui',
        'AccessControlSystem.main.pages.components',
        'AccessControlSystem.main.pages.form',
        'AccessControlSystem.main.pages.tables',
        'AccessControlSystem.main.pages.charts',
        'AccessControlSystem.main.pages.maps',
        'AccessControlSystem.main.pages.profile',
        'AccessControlSystem.main.pages.users',
        'AccessControlSystem.main.pages.sockets',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig(baSidebarServiceProvider) {
        baSidebarServiceProvider.addStaticItem({
            title: 'Pages',
            icon: 'ion-document',
            subMenu: [{
                title: 'Sign In',
                stateRef: 'app.login',
            }, {
                title: 'Sign Up',
                fixedHref: 'reg.html',
                blank: true
            }, {
                title: 'User Profile',
                stateRef: 'app.main.pages.profile'
            }, {
                title: '404 Page',
                fixedHref: '404.html',
                blank: true
            }]
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Menu Level 1',
            icon: 'ion-ios-more',
            subMenu: [{
                title: 'Menu Level 1.1',
                disabled: true
            }, {
                title: 'Menu Level 1.2',
                subMenu: [{
                    title: 'Menu Level 1.2.1',
                    disabled: true
                }]
            }]
        });
    }

})();
