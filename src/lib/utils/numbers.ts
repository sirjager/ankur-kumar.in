export function parseToNumber(value: any): number | undefined {
	const num = Number(value);
	return !isNaN(num) ? num : undefined;
}

export function isNumber(i: any): boolean {
	if (typeof i === 'string') {
		return !isNaN(Number(i)) && isFinite(parseFloat(i));
	}
	return typeof i === 'number' && !isNaN(i) && isFinite(i);
}

export function getRandomNumber(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}
