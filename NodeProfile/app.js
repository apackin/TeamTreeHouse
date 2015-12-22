var profile = require("./profile.js");
// .js is optional
var users = process.argv.slice(2);
// slice(2) is the same as splice(2, process.argv.length);

users.forEach(profile.get);
