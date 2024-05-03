import type {APIRoute} from "astro";

export const prerender = false;

export const toKey = (slug = "") => {
	const appname = import.meta.env.APP_NAME;
	const key = `${appname}:views:${slug}`;
	return key;
};

export const toSlug = (key = "") => {
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

export const GET: APIRoute = async ({params, url}) => {
	try {
		const {path} = params;
		if (!path) return Response.json({error: "path is required"}, {status: 400});

		// NOTE: if path is *, it will return all for all keys
		if (["*", "all"].includes(path)) {
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
		}

		const hasIncr = url.searchParams.has("incr");
		const incrVal = url.searchParams.get("incr");
		const shouldIncr = hasIncr && (incrVal === "" || incrVal === "true");

		// NOTE: if should increment then use incr to increment views
		if (shouldIncr) {
			const incrementURL = `/incr/${toKey(path)}`;
			const res = await makeRequest(incrementURL);
			if (res.status !== 200) {
				const {error} = await res.json();
				return Response.json({error}, {status: 500});
			}
			const {result = ""} = await res.json();
			return Response.json(
				{path, views: parseInt(result)},
				{status: 200, headers: responseHeaders}
			);
		}

		// NOTE: if should not increment then use get to get views
		const fetchViewsURL = `/get/${toKey(path)}`;
		const res = await makeRequest(fetchViewsURL);
		if (res.status !== 200) {
			const {error} = await res.json();
			return Response.json({error}, {status: 500});
		}
		const {result = ""} = await res.json();
		return Response.json({path, views: parseInt(result)}, {status: 200, headers: responseHeaders});
	} catch (error: any) {
		return Response.json({error: error?.message}, {status: 500});
	}
};
