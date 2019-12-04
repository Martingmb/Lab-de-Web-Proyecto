const fs = require('fs-extra');
const path = require('path');
var beautify = require("json-beautify");

var def = {
	database: {
		url: 'mongodb://localhost/store',
		user: '',
		password: ''
	},
	sendgrid: ''
}

var p = path.join(__dirname, '..', 'config.json');
var config;

if(!fs.existsSync(p)){
	fs.writeFileSync(p, beautify(def, null, 3, 80));
	config = def;
}else{
	config = fs.readJsonSync(p);
	var h = false;
	for(var i in def){
		if(typeof config[i] === 'undefined'){
			console.log("[Config]: Missing "+i+": "+def[i]);
			config[i] = def[i];
			h = true;
		}
	}
	if(h) fs.writeFileSync(p, beautify(config, null, 3, 80));
}

module.exports = config;