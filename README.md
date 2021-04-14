# Athan App
Welcome to the athan app, where your data is stored locally and not sold to a foreign government.

# How to use 
1- Open the settings menu by clicking on the gear icon in the bottom left corner

2- Set your city and country code

3- Click "Update Location"

![](https://github.com/Electr0d/AthanApp/blob/main/docs/img/location.gif)
# Features

## Athans
The Athan app calls to prayer using the accurate "Aladan Rapid" API. The volume of each prayer is set using the slider.
![](https://github.com/Electr0d/AthanApp/blob/main/docs/img/athan.gif)

## Reminders
The program will automatically play a sound cue 10 minutes before the call to prayer, just in case if you forgot to pray. Reminders for each prayer can be toggled on or off in the athan timetable.

## Custom athan files
You can play your own athan files if you do not like the athan files bundled with the program. You can do so by:

1- Opening the settings menu

2- Press "Open Audio Folder"

3- put your audio files, they must be .mp3 or .wav and named as "imsak", "duhr", "asr", "maghrib", "isha", "athan", "reminder"

The program will look for the audio file named after the prayer, if the file doesn't exist, then it will look for the "athan.mp3" or "athan.wav", if that audio file doesn't exist either, then it will use the default audio file.


# How to install
Run the following commands to start the program in development mode:
```
git clone https://www.github.com/Electr0d/AthanApp
cd AthanApp
npm install
npm start
```

# Issues
If you have any issues, please start an issue or contact me at hamoz.sq78@gmail.com
