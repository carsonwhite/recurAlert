
let reminders;

browser.alarms.onAlarm.addListener(async (alarm) => {

	reminders = (await browser.storage.local.get("reminders")).reminders;
	let matchedAlarm;

	for (let i = 0; i < reminders.length; i++) {
		let r = reminders[i];

		let alarmTitle = `${i}-${r.title}-${r.message}`;

		if (alarmTitle === alarm.name) {
			matchedAlarm = r;
			break;
		}
	}
	if (!matchedAlarm) {
		browser.alarms.clear(alarm.name);
		return;
	}

	let currentDateTime = new Date();
	let hours = currentDateTime.getHours();
	let minutes = currentDateTime.getMinutes();
	let currentDay = currentDateTime.getDay();
	let alarmStartTime = matchedAlarm.startTime.split(":");
	let alarmEndTime = matchedAlarm.endTime.split(":");

	// Check if the current time is within the alarm time range
	if (hours >= parseInt(alarmStartTime[0]) && hours <= parseInt(alarmEndTime[0])) {
		if (minutes >= parseInt(alarmStartTime[1]) && minutes <= parseInt(alarmEndTime[1])) {
			// Check if the current day is a day the alarm is set to go off
			if (matchedAlarm.days[currentDay] === 1) {
				browser.notifications.create({
					type: "basic",
					iconUrl: browser.runtime.getURL("icons/icon.png"),
					title: matchedAlarm.title,
					message: matchedAlarm.message
				});
			}
		}
	}


});