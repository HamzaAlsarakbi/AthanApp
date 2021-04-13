function openSettings() {
  let popup = new Popup('settings', 'Settings', { src: icons.gear, height: '20px' });
  let locationSection = new Section('location', 'Location', popup.body);
  
  // form
  let form = new Form({ class: 'location' }, locationSection.body).form;
  new RichInput({ class: 'location', id: 'city', value: config.settings.api.city }, 'City (New York, Toronto)', form)
  new RichInput({ class: 'location', id: 'country-code', value: config.settings.api.countryCode }, 'Country Code (US, CA)', form)
  addElement('button', { class: 'location', id: 'save', onclick: `saveLocation()` }, 'Update Location', locationSection.body);
  
  
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