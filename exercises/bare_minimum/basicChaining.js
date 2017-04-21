/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promisification = require('./promisification.js');
var promiseConstructor = require('./promiseConstructor.js');


var write = function(writeFilePath, jsonStuff, callback) {
  fs.writeFile(writeFilePath, JSON.stringify(jsonStuff), (error) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, 'success');
    }
  });
};

var writeAsync = Promise.promisify(write);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
  .then( function(username) {
    // console.log(resolve, reject);
    return promisification.getGitHubProfileAsync(username);
  }).then( function(jsonStuff) {
    console.log(JSON.stringify(jsonStuff));
    return writeAsync(writeFilePath, jsonStuff);
  }).catch( function(error) {
    console.log(error);
  });
};



// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
