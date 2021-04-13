let components = {
	calling: false,
	caller: '',
	time: ''
}






function callToPrayer(prayer) {
	if (prayer == undefined) prayer = 'Test Prayer';
	if (!callToPrayerOn) {
		// prevent multiple calltoprayer calls
		callToPrayerOn = true;

		// create audio object
		audio = new Audio(path.join(__dirname + '/assets/audio/Athan Naqshbandi.mp3'));
		if (prayer != 'Test Prayer') {
			config[prayer].prayerOn = true;
			if (prayer == 'imsak') {
				audio.setAttribute('src', path.join(__dirname + '/assets/audio/Athan Mecca.mp3'));
				audio.load();
			}
			audio.volume = config[prayer].volume;
		}
		audio.play();
		el.prayerButton.setAttribute('onclick', 'killAudio()');
		el.prayerButton.textContent = 'End Prayer [ ' + prayer + ' ]';

		// get audio duration when the audio has fully loaded
		audio.addEventListener('loadeddata', function() {
			setTimeout(function() {
				if (callToPrayerOn) killAudio();
			}, audio.duration * 1000 + 1000);
		});
	}
}
function killAudio() {
	audio.pause();
	audio.currentTime = 0;
	el.prayerButton.setAttribute('onclick', 'callToPrayer("Test Prayer")');
	el.prayerButton.textContent = 'Call To Prayer';
	components.calling = false;
}





function reminder() {
	let audio = new Audio(path.join(__dirname + '/assets/audio/reminder.wav'));
	audio.play();
	audio.addEventListener('loadeddata', function() {
		setTimeout(function() {
			audio.pause();
			audio.currentTime = 0;
		}, audio.duration * 1000 + 1000);
	});
}
