const el = {
	prayerButton: document.querySelector('.toggle#prayer'),
	volume: {
		imsak: document.querySelector('#imsak-volume'),
		fajr: document.querySelector('#fajr-volume'),
		duhr: document.querySelector('#duhr-volume'),
		asr: document.querySelector('#asr-volume'),
		maghrib: document.querySelector('#maghrib-volume'),
		isha: document.querySelector('#isha-volume')
	}
}



for (let prayer in el.volume) {
	el.volume[prayer].value = config.prayers[prayer].volume * 100;
	document.querySelector(`p#${prayer}-volume`).textContent = config.prayers[prayer].volume * 100 + '%';
	if (config.prayers[prayer].reminder) toggleSwitch(prayer, 'transform');
}

for(athan in el.volume) {
	el.volume[athan].addEventListener('input', update);
}

function update(e) {
	let id = e.target.id;
	let value = e.target.value;
	let prayer = id.replace('-volume', '');
	config.prayers[prayer].volume = Number(value) / 100;
	document.querySelector('p#' + id).textContent = value + '%';
	if (components.calling && components.caller == prayer) {
		audio.volume = config.prayers[prayer].volume;
	}
}
function toggleSwitch(prayer, action) {
	let id = prayer + '-button';
	let circle = document.querySelector('.circle#' + id);
	if (action == 'transform') {
		circle.classList.toggle('button-on');
	} else {
		// transformations
		toggleSwitch(prayer, 'transform');
		// toggle reminder
		config.prayers[prayer].reminder = !config.prayers[prayer].reminder;
		save();
	}
}