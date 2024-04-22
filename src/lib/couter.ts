export async function getCount(key: string) {
	const redisURL = import.meta.env.REDIS_URL;
	const res = await fetch(`${redisURL}/get/${key}`, {
		headers: {Authorization: "Bearer " + import.meta.env.REDIS_KEY},
	});
	if (res.status !== 200) return undefined;
	const data = await res.json();
	console.log(data);
	return "sdasd";
}

export async function incrementCount(key: string) {
	const redisURL = import.meta.env.REDIS_URL;
	const current = await getCount(key);
	if (!current) return null;
	const count = current + 1;
	const res = await fetch(`${redisURL}/set/${key}/${count}`, {
		headers: {Authorization: "Bearer " + import.meta.env.REDIS_KEY},
	});
	if (res.status !== 200) return null;
	const data = await res.json();
	console.log(data);
}
