import type {APIRoute} from "astro";

export const prerender = false;

const toKey = (slug = "") => {
	const appname = import.meta.env.APP_NAME;
	const key = `${appname}:views:${slug}`;
	return key;
};

const toSlug = (key = "") => {
	const appname = import.meta.env.APP_NAME;
	const slug = key.replace(`${appname}:views:`, "");
	return slug;
};

const responseHeaders = {
	"Content-Type": "application/json",
	"Cache-Control": "public, s-maxage=60, stale-while-revalidate=25",
};

const makeRequest = async (url: string, method?: string) => {
	const endpoint = `${import.meta.env.REDIS_REST_ENDPOINT}`;
	const res = await fetch(`${endpoint}${url}`, {
		method: method || "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${import.meta.env.REDIS_ACCESS_TOKEN}`,
		},
	});
	return res;
};

export const GET: APIRoute = async () => {
	try {
		let res = await makeRequest(`/keys/${toKey("*")}`);
		if (res.status !== 200) {
			const {error} = await res.json();
			return Response.json({error}, {status: 500});
		}
		const {result: keys} = await res.json();
		const valuesURL = `/mget/${keys.join("/")}`;
		res = await makeRequest(valuesURL);
		if (res.status !== 200) {
			const {error} = await res.json();
			return Response.json({error}, {status: 500});
		}
		const {result: values} = await res.json();
		const data = keys.map((key: string, i: number) => {
			const slug = toSlug(key);
			const views = parseInt(values[i]);
			return {path: slug, views};
		});
		return Response.json(data, {status: 200, headers: responseHeaders});
	} catch (error: any) {
		return Response.json({error: error?.message}, {status: 500});
	}
};
