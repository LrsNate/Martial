'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /boot when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/boot");
  });


  describe('search', function() {

    beforeEach(function() {
      browser.get('index.html#!/search');
    });


    it('should render search when user navigates to /search', function() {
      expect(element.all(by.css('[ng-view] h3')).first().getText()).
        toMatch(/Recherche/);
    });

  });
});
