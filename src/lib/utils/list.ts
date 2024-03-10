export function cycleStrings(strings: string[], current: string) {
	const currentIndex = strings.indexOf(current);
	if (currentIndex === -1) return strings[0];
	const nextIndex = (currentIndex + 1) % strings.length;
	return strings[nextIndex];
}

export function shuffleItems<T>(items: T[]): T[] {
	const shuffled = [...items];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export function getRandomItem<T>(items: T[]): T | undefined {
	if (items.length === 0) return undefined;
	return items[Math.floor(Math.random() * items.length)];
}
