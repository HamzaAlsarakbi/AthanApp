// to open athan folder
const { shell } = require('electron');
const el = {
	volume: {
		imsak: document.querySelector('#imsak-volume'),
		fajr: document.querySelector('#fajr-volume'),
		duhr: document.querySelector('#duhr-volume'),
		asr: document.querySelector('#asr-volume'),
		maghrib: document.querySelector('#maghrib-volume'),
		isha: document.querySelector('#isha-volume')
	},
}
const PLAY_BUTTON = document.querySelector('#play-button');
let athan;
let components = {
	calling: false,
	caller: '',
	time: '',
	save: false
}