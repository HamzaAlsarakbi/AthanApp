const fs = require('fs');
const path = require('path');
let config = unpack(path.join(__dirname, '/assets/data/default_config.json'));
let savedConfig = JSON.parse(JSON.stringify(config));
const SAVEBUTTON = document.querySelector('#save-button');
// app 
const APP_DIR = '/AthanApp';



function getUserHome() {
  return process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'];
}
const FILLER = process.platform == 'win32' ? 'AppData/Local' : ''
// assemble config path
const PARENT_DIR = path.join(getUserHome(), FILLER, APP_DIR);
const AUDIO_DIR = path.join(PARENT_DIR, '/audio');


if (!fs.existsSync(PARENT_DIR)) fs.mkdirSync(PARENT_DIR);
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR);
const CONFIG_PATH = path.join(PARENT_DIR, '/config.json');

function pack(path, object) {
  fs.writeFileSync(path, JSON.stringify(object));
}

function unpack(path) {
  return JSON.parse(fs.readFileSync(path));
}
function loadSavedConfig() {
  try {
    config = unpack(CONFIG_PATH);
    savedConfig = JSON.parse(JSON.stringify(config));;
  } catch (err) {
    console.log("Config doesn't exist. Using default template. Athan times won't be available until you set your city and country code.");
    pack(CONFIG_PATH, config);
  }
  for(let prayer in config.prayers) {
    document.querySelector(`#${prayer}-time`).textContent = config.prayers[prayer].time;
  }
}
loadSavedConfig();









function save() {
  pack(CONFIG_PATH, config);
  // update saved config
  savedConfig = JSON.parse(JSON.stringify(config));;
  setStatus({ src: icons.confirm }, 'Updated user preferences.');

  // disable save button
  SAVEBUTTON.classList.remove('button-enabled');
  SAVEBUTTON.removeAttribute('onclick');
}


// check if there are changes
function checkDiscrepancy() {
  let sConfig = JSON.stringify(savedConfig);
  let currentConfig = JSON.stringify(config);
  // if there are changes
  if (sConfig != currentConfig) {
    components.save = true;
    SAVEBUTTON.classList.add('button-enabled');
    SAVEBUTTON.setAttribute('onclick', 'save()');
  } else {
    SAVEBUTTON.classList.remove('button-enabled');
    SAVEBUTTON.removeAttribute('onclick');
  }
}