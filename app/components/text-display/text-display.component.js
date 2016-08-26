'use strict';

angular
    .module('myApp.textDisplay')
    .component('textDisplay', {
        templateUrl: 'components/text-display/text-display.template.html',
        bindings: {
            work: '='
        },
        controller: [function () {
            this.isCollapsed = true;
        }]
    });