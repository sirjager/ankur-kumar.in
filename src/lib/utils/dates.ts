export interface DateObject {
	year: string;
	month: string;
	monthNumber: string;
	date: string;
	hour: string;
	minutes: string;
	seconds: string;
	thisYear: boolean;
	thisMonth: boolean;
	today: boolean;
}

const getMonthName = (month: string) => {
	const monthNumber = parseInt(month, 10);
	if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
		// If not a number than return same
		return month;
	}
	const months: string[] = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return months[monthNumber - 1];
};

export const parseDate = (toISOString?: string | null) => {
	if (!toISOString) return undefined;
	try {
		const splits = toISOString.split("T");
		if (splits.length < 2) return undefined;
		const dateComponents = splits[0].split("-");
		const timeComponents = splits[1].split(":");
		const today = new Date();
		const parsedDate = new Date(toISOString);
		return {
			year: dateComponents[0],
			month: getMonthName(dateComponents[1]),
			monthNumber: dateComponents[1],
			date: dateComponents[2],
			hour: timeComponents[0],
			minutes: timeComponents[1],
			seconds: timeComponents[2].split(".")[0], // Remove milliseconds
			thisYear: today.getFullYear() === parsedDate.getFullYear(),
			thisMonth: today.getMonth() + 1 === parseInt(dateComponents[1]),
			today: today.toDateString() === parsedDate.toDateString(),
		};
	} catch (_) {
		//
	}
};

export function getRelativeTime(_date: any) {
	const now = new Date();
	const date = new Date(_date);
	const diffInMilliseconds = now.getTime() - date.getTime();
	// Calculate the differences in seconds, minutes, hours, and days
	const seconds = Math.floor(diffInMilliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const rtf = new Intl.RelativeTimeFormat("en", {numeric: "auto", style: "long"});
	if (seconds < 60) {
		return rtf.format(-seconds, "second");
	} else if (minutes < 60) {
		return rtf.format(-minutes, "minute");
	} else if (hours < 24) {
		return rtf.format(-hours, "hour");
	} else if (days < 7) {
		return rtf.format(-days, "day");
	} else {
		const weeks = Math.floor(days / 7);
		return rtf.format(-weeks, "week");
	}
}

export default parseDate;
