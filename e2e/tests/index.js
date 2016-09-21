'use strict';
// Use the external Chai As Promised to deal with resolving promises in
// expectations.
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('no protractor at all', () => {
  it('should still do normal tests', () => {
    expect(true).to.equal(true);
  });
});

describe('protractor library', () => {
  it.skip('should be able to skip tests', () => {
    expect(true).to.equal(false);
  });

  it('should expose the correct global variables', () => {
    expect(protractor).to.exist;
    expect(browser).to.exist;
    expect(by).to.exist;
    expect(element).to.exist;
    expect($).to.exist;
  });

  it('verify application title', () => {
    browser.get('index.html');
    browser.getTitle().then((title) => {
      expect(title).to.be.equal('Bouncing Balls');
    });
  });

  describe('with async tests', () => {
    let finished = false;

    it('should wait for async operations to finish', () => {
      browser.get('index.html').then(() => { finished = true; });
    });

    after('verify mocha waited', () => {
      if (!finished) { throw new Error('Mocha did not wait for async!'); }
    });
  });
});
