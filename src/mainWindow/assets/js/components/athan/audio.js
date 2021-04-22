class Athan {
  constructor(prayer) {
		if(components.calling) athan.stopAthan();
    this.url = {
      default: path.join(__dirname + '/assets/audio/Athan Naqshbandi.mp3'),
      defaultImsak: path.join(__dirname + '/assets/audio/Athan Mecca.mp3'),
      defaultReminder: path.join(__dirname + '/assets/audio/reminder.wav'),
      custom: [],
			url: '',
    }
		this.volume = config.prayers[prayer] ? config.prayers[prayer].volume : 1;

		// get a list of all files in the custom audio directory
		let customList = [];
    try {
			fs.readdirSync(path.join(AUDIO_DIR)).forEach((file) => {
				customList.push(file);
			});
		} catch(err) {
			setStatus({ src: icons.remove }, 'Audio folder not found. Please reload this window to fix this issue. Using default prayer sound');
		}
    
    let nameList = [ 'imsak', 'duhr', 'asr', 'maghrib', 'isha', 'reminder', 'athan' ];
    // take out athan files named other than: imsak, duhr, ask, maghrib, isha, reminder, athan
    for(let i = 0; i < customList.length; i++) {
      for (let x = 0; x < nameList.length; x++) {
        if (customList[i].toLowerCase().includes(nameList[x])) {
          this.url.custom.push(customList[i]);
          break;
        }
      }
    }
		// check if there is a custom file for prayer
		if(this.url.custom.indexOf(`${prayer}.mp3`) > -1 || this.url.custom.indexOf(`${prayer}.wav`) > -1) {
			if(this.url.custom.indexOf(`${prayer}.mp3`) > -1) {
				this.url.url = this.url.custom[this.url.custom.indexOf(`${prayer}.mp3`)];
			} else {
				this.url.url = this.url.custom[this.url.custom.indexOf(`${prayer}.wav`)];
			}
			this.url.url = path.join(AUDIO_DIR, this.url.url);

			// if there is an athan file
		} else if(this.url.custom.indexOf(`athan.mp3`) > -1 || this.url.custom.indexOf(`athan.wav`) > -1) {
			// if the prayer isn't a reminder, use the athan file
			if(prayer == 'reminder') {
				this.url.url = this.url.defaultReminder;
			} else {
				// check if there is a custom file for athan
				if(this.url.custom.indexOf(`athan.mp3`) > -1) {
					this.url.url = this.url.custom[this.url.custom.indexOf(`athan.mp3`)];
				} else {
					this.url.url = this.url.custom[this.url.custom.indexOf(`athan.wav`)];
				}
				this.url.url = path.join(AUDIO_DIR, this.url.url);
			}
		} else {
			
			// if there is no custom sound file for the prayer/reminder use default
			this.url.url = prayer == 'reminder' ? this.url.defaultReminder : prayer == 'imsak' ? this.url.defaultImsak : this.url.default;
		}
		
		console.log(`Using audio src: ${this.url.url}`);
		if(prayer != 'test' && prayer != 'reminder') transitionBackground(path.join(__dirname, `assets/img/backgrounds/${prayer}.jpg`));
		// make a call to prayer
		setStatus({ src: icons.mosque }, 'Calling to prayer.');
		components.calling = true;
		components.caller = prayer;
		this.athan = new Audio(this.url.url);
		this.athan.volume = this.volume;
		this.athan.play();
		let classContext = this;
		this.athan.addEventListener('loadeddata', function() {
			setTimeout(function() {
				if (components.calling) classContext.stopAthan();
			}, this.duration * 1000);
		});
		// change button
		PLAY_BUTTON.textContent = 'Stop';
		PLAY_BUTTON.setAttribute('onclick', 'athan.stopAthan()');
		document.body.addEventListener('keydown', bindAthan);
  }
	
	stopAthan() {
		this.athan.pause();
		this.athan.currentTime = 0;
		components.calling = false;
		components.caller = '';
		PLAY_BUTTON.textContent = 'Play';
		PLAY_BUTTON.setAttribute('onclick', `testCall()`);
	}
	muteAthan() {
		this.athan.volume = 0;
	}
	unmuteAthan() {
		this.athan.volume = this.volume;
	}

}
function testCall() {
	athan = new Athan('test');
}

// add keybind
function bindAthan(e) {
	if(e.code == 'Space') {
		if(components.calling) {
			athan.stopAthan();
		}
	}
}