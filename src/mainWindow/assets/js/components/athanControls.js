


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
		athan.athan.volume = config.prayers[prayer].volume;
	}
	checkDiscrepancy();
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
		checkDiscrepancy();
	}
}