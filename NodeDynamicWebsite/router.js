var Profile = require("./profile.js");
var renderer = require('./renderer.js');
var querystring = require('querystring')

var commonHeaders = {'Content-Type': 'text/html'};

//Handle the HTTP route GET / and POST / i.e. Home
function home(req, res){
	if(req.url === "/"){
		if(req.method.toLowerCase() === "get") {
			//show search
			res.writeHead(200, commonHeaders);
			renderer.view("header", {}, res);
			renderer.view("search", {}, res);
			renderer.view("footer", {}, res);
			res.end();
		} else {

			//get the post data from body
			req.on("data", function(postBody){
				//get the post data from the body
				var query = querystring.parse(postBody.toString());
				// turn the batch into a string; string into object
				res.writeHead(303, {'Location': "/" + query.username});
				// 303 status code redirects, location sets where it goes.
				res.end();
			});
			//extract username

			// and send it to /:username
		}
	}
}

//Handel the HTTP route GET /:username i.e. apackin
function user(req, res) {
	var username = req.url.replace('/', '');
	if(username.length > 0) {
		res.writeHead(200, commonHeaders);
		renderer.view("header", {}, res);

			//get json from Treehouse 
		var studentProfile = new Profile(username);
		studentProfile.on("end", function(profileJSON){
			//show profile

			//store needed values
			var values = {
				avatarURL: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			}
			//simple response
			renderer.view("profile", values, res);
			renderer.view("footer", {}, res);
			res.end();
		});

		// on error
		studentProfile.on("error", function(err){
			renderer.view("error", {errorMessage: err.message}, res);
			renderer.view("search", {}, res);
			renderer.view("footer", {}, res);
			res.end();
		});
//*/

	}
}


module.exports.home = home;
module.exports.user = user;