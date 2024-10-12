import { isBetweeen } from "../lib/helpers";

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

	// Check if the current time is between the start and end time of the alarm and if the alarm is set for the current day
	if (isBetweeen(matchedAlarm.startTime, matchedAlarm.endTime) && matchedAlarm.days[(new Date()).getDay()]) {
		browser.notifications.create({
			type: "basic",
			iconUrl: browser.runtime.getURL("icons/icon.png"),
			title: matchedAlarm.title,
			message: matchedAlarm.message
		});
	}
});