
// let reminders;

// browser.alarms.onAlarm.addListener(async (alarm) => {

// 	reminders = await browser.storage.local.get("reminders")

// 	browser.notifications.create({
// 		type: "basic",
// 		iconUrl: browser.runtime.getURL("icons/icon.png"),
// 		title: reminders[alarm.name].title,
// 		message: "The refresh alarm has been triggered."
// 	});

// });