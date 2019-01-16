/* 
===================================================
Oric first NightwatchJS test, titanic
Some unnecessary asserts below, just for practice.

Resources used:
https://github.com/dwyl/learn-nightwatch
https://github.com/dwyl/learn-nightwatch/blob/master/nightwatch.conf.BASIC.js - Required config
https://github.com/nightwatchjs/nightwatch-docs/blob/master/api/method/click.md - learned how to click an element and find text outside of titles from here

===================================================
*/

// to run tests, place test in e2e directory, open Git Bash, navigate to dir 'learn-nightwatch', and enter 'npm run e2e'

var config = require('../../nightwatch.conf.js');
var movieTitle = 'titanic'

module.exports = {
  '@tags': ['toTest'],
  'Oric IMDb': function(browser) {
	  browser
	  .url('https://www.imdb.com/')
	  // Wait for body to be ready and ensure the title matches that of the homepage
	  .waitForElementVisible('body')
	  .assert.title('IMDb - Movies, TV and Celebrities - IMDb')
	  
	  // Wait for the searchbar to be ready, enter the search term and click to send query
	  .waitForElementVisible('input[id="navbar-query"]')
	  .setValue('input[id="navbar-query"]', movieTitle)
	  .click('button[id="navbar-submit-button"]', function(result) {this.assert.strictEqual(result.status, 0);})
	  
	  // Ensure you're on the found results page, displaying results for search term from before.
	  .assert.title('Find - IMDb')
	  .assert.containsText('span.findSearchTerm', movieTitle)
	  .end();
  }
};
