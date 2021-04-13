const fs = require('fs');
const path = require('path');
let config = unpack(path.join(__dirname, '/assets/data/default_config.json'));


// app 
const APP_DIR = '/AthanApp';

function getUserHome() {
	return process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'];
}
const FILLER = process.platform == 'win32' ? 'AppData/Local' : ''
// assemble config path
const PARENT_DIR = path.join(getUserHome(), FILLER, APP_DIR);


if(!fs.existsSync(PARENT_DIR)) fs.mkdirSync(PARENT_DIR);
const CONFIG_PATH = path.join(PARENT_DIR, '/config.json');

function pack(path, object) {
  fs.writeFileSync(path, JSON.stringify(object));
}

function unpack(path) {
  return JSON.parse(fs.readFileSync(path));
}

try {
  config = unpack(CONFIG_PATH);
} catch (err) {
  console.log("Config doesn't exist. Using default template. Athan times won't be available until you set your city and country code.");
  pack(CONFIG_PATH, config);
}

function save() {
  pack(CONFIG_PATH, config);
  console.log(save.caller)
  setStatus({ src: icons.confirm }, 'Updated user preferences.');
}