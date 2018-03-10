import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for voting-network', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be voting-network', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('voting-network');
    })
  });

  it('navbar-brand should be voting-network@1.0.0',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('voting-network@1.0.0');
  });

  
    it('Subject component should be loadable',() => {
      page.navigateTo('/Subject');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Subject');
    });

    it('Subject table should have 8 columns',() => {
      page.navigateTo('/Subject');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });

  
    it('Vote component should be loadable',() => {
      page.navigateTo('/Vote');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Vote');
    });

    it('Vote table should have 5 columns',() => {
      page.navigateTo('/Vote');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });

  

});
