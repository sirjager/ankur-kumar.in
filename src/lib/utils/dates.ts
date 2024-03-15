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

export default parseDate;
