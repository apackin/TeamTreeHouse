var fs = require('fs');

function mergeValues(values, content) {
	// cycle over the keys
	for (var key in values) {
		content = content.replace("{{" + key + "}}", values[key]);
	}
	return content;
		// replace the keys with content
}



function view(templateName, values, res) {
	//Read from the template files  
	var fileContents = fs.readFileSync('./views/' + templateName + ".html", {encoding: "utf8"});
	//Insert values in to the content
	fileContents = mergeValues(values, fileContents);
	///Write out to the response		
	res.write(fileContents);
}


module.exports.view = view;