function openSettings() {
  let popup = new Popup('settings', 'Settings', { src: icons.gear, height: '20px' });
  let locationSection = new Section('location', 'Location', popup.body);
  
  // form
  let form = new Form({ class: 'location' }, locationSection.body).form;
  new RichInput({ class: 'location', id: 'city', value: config.settings.api.city }, 'City (New York, Toronto)', form)
  new RichInput({ class: 'location', id: 'country-code', value: config.settings.api.countryCode }, 'Country Code (US, CA)', form)
  addElement('button', { class: 'location', id: 'save', onclick: `saveLocation()` }, 'Update Location', locationSection.body);
 
 
  let athanSection = new Section('athan', 'Athan', popup.body);
  addElement('button', { class: 'athan-button', id: 'open-audio', onclick: `openAudioFolder()`}, 'Open Audio Folder', athanSection.body);
}

function openAudioFolder() {
  try {
    shell.openExternal(AUDIO_DIR);
  } catch(err) {
    setStatus({ src: icons.remove }, 'Failed to open audio folder, possibly deleted by user. Press Ctrl + R then retry.');
  }
}


function saveLocation() {
  // shorthands
  let settings = config.settings.api;
  let city = document.querySelector('#city-rich-input');
  let countryCode = document.querySelector('#country-code-rich-input');

  // make sure inputs are not empty and not the same as stored values
  if(city.value != '' && countryCode.value != '') {
    if(city.value != settings.city || countryCode.value != settings.countryCode) {
      settings.city = city.value;
      settings.countryCode = countryCode.value;
      save();
      fetchPrayerTimes();
    }
  } else {
    // select empty inputs
    if(city.value == '') {
      city.select();
    } else {
      countryCode.select(); 
    }
  }
}