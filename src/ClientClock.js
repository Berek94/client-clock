import {
	CLIENT_CLOCK_ON_SECOND_CHANGE,
	CLIENT_CLOCK_ON_MINUTE_CHANGE,
	CLIENT_CLOCK_ON_HOUR_CHANGE,
	CLIENT_CLOCK_ON_DAY_CHANGE,
	CLIENT_CLOCK_STOP,
} from './eventTypes';

export default class ClientClock {
	constructor() {
		this.oldDate = new Date();
		this.nowDate = new Date();
		this.timerID = null;
		this.isRunning = false;
	}

	run() {
		if (!this.isRunning) {
			this.isRunning = true;
			this.publish();
			this.timerID = setInterval(() => {
				this.publish();
			}, 1000);
		}
	}

	publish() {
		this.nowDate = new Date();
	
		if (this.isSecondChanged) {
			this.dispatch(CLIENT_CLOCK_ON_SECOND_CHANGE);
		}
		if (this.isMinuteChanged) {
			this.dispatch(CLIENT_CLOCK_ON_MINUTE_CHANGE);
		}
		if (this.isHourChanged) {
			this.dispatch(CLIENT_CLOCK_ON_HOUR_CHANGE);
		}
		if (this.isDayChanged) {
			this.dispatch(CLIENT_CLOCK_ON_DAY_CHANGE);
		}

		this.oldDate = this.nowDate;
	}

	isTimeChanged(timeGetter) {
		return this.nowDate[timeGetter]() !== this.oldDate[timeGetter]();
	}

	get isSecondChanged() {
		return this.isTimeChanged('getSeconds');
	}

	get isMinuteChanged() {
		return this.isTimeChanged('getMinutes');
	}

	get isHourChanged() {
		return this.isTimeChanged('getHours');
	}

	get isDayChanged() {
		return this.isTimeChanged('getDate');
	}

	onChange(func, actionType) {
		document.addEventListener(actionType, func);

		return () => document.removeEventListener(actionType, func);
	}

	onSecondChange(func) {
		this.onChange(func, CLIENT_CLOCK_ON_SECOND_CHANGE);
	}

	onMinuteChange(func) {
		this.onChange(func, CLIENT_CLOCK_ON_MINUTE_CHANGE);
	}

	onHourChange(func) {
		this.onChange(func, CLIENT_CLOCK_ON_HOUR_CHANGE);
	}

	onDayChange(func) {
		this.onChange(func, CLIENT_CLOCK_ON_DAY_CHANGE);
	}

	dispatch(eventType) {
		const event = new Event(eventType);
		event.time = this.nowDate;

		document.dispatchEvent(event);
	}

	stop() {
		if (this.isRunning) {
			this.isRunning = false;
			clearInterval(this.timerID);

			this.dispatch(CLIENT_CLOCK_STOP);
		}
	}
}
