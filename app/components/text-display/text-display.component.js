'use strict';

angular
    .module('myApp.textDisplay')
    .component('textDisplay', {
        templateUrl: 'components/text-display/text-display.template.html',
        bindings: {
            work: '=',
            onDelete: '&'
        },
        controller: [function () {
            this.isCollapsed = true;
        }]
    });