// browser.webNavigation.onCompleted.addListener(async (details) => {
// 	// window.open("popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");


// }, { url: [{ urlMatches: ".*" }] });
let reminders;

reminders = browser.storage.local.get("reminders").then((data) => {
	console.log(data);

	for (const [index, reminder] of data.reminders) {
		browser.alarms.create(index, { periodInMinutes: .1 });
	}
})




browser.alarms.onAlarm.addListener((alarm) => {
	console.log("Got an alarm!", alarm);

	browser.notifications.create({
		type: "basic",
		iconUrl: browser.runtime.getURL("icons/icon.png"),
		title: reminders[alarm.name].title,
		message: "The refresh alarm has been triggered."
	});

});