/* 
===================================================
Oric first NightwatchJS test, IMDb page screenshot bot

Resources used:
https://github.com/dwyl/learn-nightwatch
https://github.com/dwyl/learn-nightwatch/blob/master/nightwatch.conf.BASIC.js - Required config
https://github.com/nightwatchjs/nightwatch-docs/blob/master/api/method/click.md - learned how to click an element and find text outside of titles from here
https://github.com/nightwatchjs/nightwatch/issues/633 - Click link
===================================================
*/

// to run tests, place test in e2e directory, open Git Bash, navigate to dir 'learn-nightwatch', and enter 'npm run e2e'

var config = require('../../nightwatch.conf.ORIC.js');

var movieTitle = "Titanic";
var movieClick = "//*[contains(text(), '"+movieTitle+"')]";
var lowerMT = movieTitle.toLowerCase();

module.exports = {
  '@tags': ['toTest'],
  'Oric IMDb Screenshot Bot': function(browser) {
	  browser
	  .url('https://www.imdb.com/')
	  // Wait for body to be ready and ensure the title matches that of the IMDb landing page
	  .waitForElementVisible('body', 1000)
	  .assert.title('IMDb - Movies, TV and Celebrities - IMDb')
	  
	  // Wait for the search bar to be ready, enter the search term and click to send query
	  .waitForElementVisible('input[id="navbar-query"]',1000)
	  .setValue('input[id="navbar-query"]', lowerMT)
	  .click('button[id="navbar-submit-button"]', function(result) {this.assert.strictEqual(result.status, 0);})
	  
	  // Ensure you're on the found results page, displaying results for search term from before.
	  .waitForElementVisible('body', 1000)
	  .assert.containsText('span.findSearchTerm', lowerMT)
	  
	  // Switch to Xpath selectors, find and click movieTitle in list, then switch back to Css
	  .useXpath().click(movieClick, function(result) {this.assert.strictEqual(result.status, 0);}).useCss()
	  
	  // Take a screenshot of the movie page, title taken from Query
	  .waitForElementVisible('body', 2000)
	  .saveScreenshot('./screenshot/'+'IMDb '+movieTitle+'.png')
	  .end();
  }
}

