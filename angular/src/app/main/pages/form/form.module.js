/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.main.pages.form', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.form', {
          url: '/form',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Form Elements',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        })
        .state('app.main.pages.form.inputs', {
          url: '/inputs',
          templateUrl: 'app/main/pages/form/inputs/inputs.html',
          title: 'Form Inputs',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('app.main.pages.form.layouts', {
          url: '/layouts',
          templateUrl: 'app/main/pages/form/layouts/layouts.html',
          title: 'Form Layouts',
          controller: 'FormLayoutsController',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('app.main.pages.form.wizard', {
          url: '/wizard',
          templateUrl: 'app/main/pages/form/wizard/wizard.html',
          controller: 'WizardCtrl',
          controllerAs: 'vm',
          title: 'Form Wizard',
          sidebarMeta: {
            order: 200,
          },
        });
  }
})();
