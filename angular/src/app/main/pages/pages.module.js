/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.main.pages', [
        'ui.router',

        'BlurAdmin.main.pages.dashboard',
        'BlurAdmin.main.pages.ui',
        'BlurAdmin.main.pages.components',
        'BlurAdmin.main.pages.form',
        'BlurAdmin.main.pages.tables',
        'BlurAdmin.main.pages.charts',
        'BlurAdmin.main.pages.maps',
        'BlurAdmin.main.pages.profile',
        'BlurAdmin.main.pages.users',
        'BlurAdmin.main.pages.sockets',
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
