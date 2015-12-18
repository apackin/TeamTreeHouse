// Problem: We need a simple way to look at a user's badge counts and JS points
// Solution: Use Node.js to connect to Treehouse's API and get profile information to print out
var https = require('https');
var http = require('http');


//Print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badges and " + points + " points in Javascript.";
  console.log(message);
};

//Print out error messages
function printError(error){
  console.error(error.message);
}


function get(username) {
  // Connect to the API URL (https://teamtreehouse.com/'username'.json)
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(res) {
    var body = "";
    //Read the data and add it to body string
    res.on('data', function(chunk) {
      body += chunk;
    });
    // After we received all of the chunks parse the string
    res.on('end', function(){
      if(res.statusCode === 200) {
        // Parse Data
      try {
      var profile = JSON.parse(body);
        // Print Data
      printMessage(username, profile.badges.length, profile.points.JavaScript);
      } catch(error) {
        //Parse Error Catcher
        printError(error);
      }
      } else {
       // Status Code Error
        printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[res.statusCode] +")"})
      }
    });
  });
  
  //Connection Error
  request.on('error', printError);
}

module.exports.get = get;