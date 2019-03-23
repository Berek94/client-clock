import ClientClock from './ClientClock';

function getHoursAndMinutes(date) {
	const slitTime = date.toLocaleTimeString().split(':');

	return `${slitTime[0]}:${slitTime[1]}`;
}

function initialize(secondsClock, minutesClock, hoursClock) {
	const dateNow = new Date();

	secondsClock.innerText = dateNow.toLocaleTimeString();
	minutesClock.innerText = getHoursAndMinutes(dateNow);
	hoursClock.innerText = getHoursAndMinutes(dateNow);
}

document.addEventListener('DOMContentLoaded', () => {
	const runButton = document.getElementById('run');
	const stopButton = document.getElementById('stop');
	const secondsClock = document.getElementById('clocks--seconds');
	const minutesClock = document.getElementById('clocks--minutes');
	const hoursClock = document.getElementById('clocks--hours');

	initialize(secondsClock, minutesClock, hoursClock);

	const clientClock = new ClientClock();
	clientClock.run();

	runButton.addEventListener('click', () => {
		clientClock.run();
	});

	stopButton.addEventListener('click', () => {
		clientClock.stop();
	});



	clientClock.onSecondChange(event => {
		secondsClock.innerText = event.time.toLocaleTimeString();
	});

	clientClock.onMinuteChange(event => {
		minutesClock.innerText = getHoursAndMinutes(event.time);
	});

	clientClock.onHourChange(event => {
		hoursClock.innerText = getHoursAndMinutes(event.time);
	});
});