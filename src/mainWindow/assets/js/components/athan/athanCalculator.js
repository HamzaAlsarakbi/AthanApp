function updatePrayerTimes() {
	for (let prayer in config.prayers) {
		// get prayer time
		let prayerTime = config.prayers[prayer].time;

		// get hour and minute of prayer time
		let hour = Number(prayerTime.charAt(0) + prayerTime.charAt(1));
		let minute = Number(prayerTime.charAt(3) + prayerTime.charAt(4));
		let ampm = hour >= 12 ? 'PM' : 'AM';
		hour = hour % 12;
		hour = hour ? hour : 12; // the hour '0' should be '12'
		minute = minute < 10 ? '0' + minute : minute;

		// assemble time string
		let time = hour + ':' + minute + ' ' + ampm;
		document.querySelector('#' + prayer + '-time').textContent = time;
	}
}


function getTime12(date) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	for (let prayer in config.prayers) {
		if(config.prayers[prayer].time != '') compare(hours, minutes, seconds, prayer);
	}
	calculateRemaining(hours, minutes, seconds);
	let ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;

	let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
	document.querySelector('.sub-header#time').textContent = strTime;
	components.time = strTime;
	return strTime;
}


function getTime() {
	getTime12(new Date());
}
getTime();
setInterval(getTime, 1000);

function compare(hours, minutes, seconds, prayer) {
	let prayerTime =
	Number(config.prayers[prayer].time.charAt(0) + config.prayers[prayer].time.charAt(1)) * 60 * 60 +
	Number(config.prayers[prayer].time.charAt(3) + config.prayers[prayer].time.charAt(4)) * 60;
	let time = hours * 60 * 60 + minutes * 60 + seconds;
	
	// comparison
	if (time == prayerTime) {
		athan = new Athan(prayer);
	} else if (time == prayerTime - 600) {
		new Athan('reminder');
	}
}


function calculateRemaining(hours, minutes, seconds) {
	for (let prayer in config.prayers) {
		if(config.prayers[prayer].time != '') calculateRemainingPrayer(prayer, hours, minutes, seconds);
	}
}

function calculateRemainingPrayer(prayerName, hours, minutes, seconds) {
	let prayer = {
		name: prayerName,
		hour: Number(config.prayers[prayerName].time.charAt(0) + config.prayers[prayerName].time.charAt(1)),
		minute: Number(config.prayers[prayerName].time.charAt(3) + config.prayers[prayerName].time.charAt(4)),
		second: 0
	};

	let time = {
		hour: Number(hours),
		minute: Number(minutes),
		second: Number(seconds)
	};

	let timeSec = time.hour * 60 * 60 + time.minute * 60 + time.second;

	let prayerTimeSec = prayer.hour * 60 * 60 + prayer.minute * 60 + prayer.second;
	if (timeSec >= prayerTimeSec) {
		prayer.hour += 24;
	}

	timeSec = time.hour * 60 * 60 + time.minute * 60 + time.second;

	prayerTimeSec = prayer.hour * 60 * 60 + prayer.minute * 60 + prayer.second;

	let remaining = Math.abs(timeSec - prayerTimeSec);

	let remainingTime = {
		name: prayerName,
		hour: Math.floor(remaining / 3600),
		minute: Math.abs(Math.floor((remaining % 3600) / 60)),
		second: Math.abs(Math.floor((remaining % 3600) % 60))
	};
	if (remainingTime.minute < 10) {
		remainingTime.minute = '0' + String(remainingTime.minute);
	}
	if (remainingTime.second < 10) {
		remainingTime.second = '0' + String(remainingTime.second);
	}
	// add up remaining time
	strTime = '-' + remainingTime.hour + ':' + remainingTime.minute + ':' + remainingTime.second;
	document.querySelector('#' + prayerName + '-remaining').textContent = strTime;
}