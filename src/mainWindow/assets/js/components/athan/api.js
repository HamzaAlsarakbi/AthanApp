const unirest = require('unirest');
const req = unirest('GET', 'https://aladhan.p.rapidapi.com/timingsByCity');


// update once every 10 hours
setInterval(fetchPrayerTimes, 10 * 3600000);
fetchPrayerTimes();

function fetchPrayerTimes() {
  setStatus({ src: icons.gear, rotate: true }, 'Fetching Prayer times...');
  if(config.settings.api.city != '' && config.settings.api.countryCode != '') {
    req.query({
      city: config.settings.api.city,
      country: config.settings.api.countryCode
    });
    
    req.headers({
      'x-rapidapi-host': 'aladhan.p.rapidapi.com',
      'x-rapidapi-key': '40a42666b7msh21c4ffb4bdb0f65p1e57cfjsnde3a2a1e6798'
    });
    
    req.end(function(res) {
      if (res.error) {
        // below is the old error
        // throw new Error(res.error);
        setStatus({ src: icons.remove }, 'Failed to fetch prayer times. Possibly an invalid location. Check settings.');
      } else {
        // console.log(res.body);
        console.table(res.body.data.timings);
        for(let prayer in config.prayers) {
          config.prayers[prayer].time = res.body.data.timings[capitalize(prayer)];
        }
        config.prayers.duhr.time = res.body.data.timings.Dhuhr
        updatePrayerTimes();
        config.update = getTime12(new Date());
        console.log('%c Data updated at ' + config.update, 'color: lightgreen');
        save(); 
        setStatus({ src: icons.confirm }, `Updated prayer times at ${components.time}.`);
        updateBackground();
      }
    });
  } else {
    setTimeout(() => {
      setStatus({ src: icons.remove }, 'Failed to fetch prayer times. Enter your city and country code in the settings menu.');
    }, 1000);
  }
}

function capitalize(text) {
  return text.replace(text.substring(0, 1), text.substring(0, 1).toUpperCase());
}