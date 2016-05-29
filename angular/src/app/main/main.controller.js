(function () {
  'use strict';

  angular
    .module('angular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $auth, $log, $http, apiBase) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1464510046342;
    vm.showToastr = showToastr;

    activate();
    login();

    function login() {
      $auth.login({
        username: 'jozef',
        password: ''
      }).then(function (data) {
        $log.debug(data);
        $http.get(apiBase + 'restricted/', function (data) {
          console.log(data);
        })
      });
    }

    function activate() {
      getWebDevTec();
      $timeout(function () {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function (awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
