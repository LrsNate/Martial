'use strict';

describe('myApp.search module', function () {

    beforeEach(module('myApp.search'));

    describe('search controller', function () {

        it('should ....', inject(function ($compile, $rootScope) {
            var searchComponent = $compile('<search></search>')($rootScope);

            $rootScope.$digest();
            expect(searchComponent).toBeDefined();
        }));

    });
});