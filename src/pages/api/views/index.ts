import type {APIRoute} from "astro";
import {toKey, toSlug, makeRequest, responseHeaders} from "./[path]";

export const prerender = false;

export const GET: APIRoute = async () => {
	const date = new Date().getTime();
	try {
		let res = await makeRequest(`/keys/${toKey("*")}`);
		if (res.status !== 200) {
			const {error} = await res.json();
			return Response.json({date, error}, {status: 500});
		}
		const {result: keys} = await res.json();
		const valuesURL = `/mget/${keys.join("/")}`;
		res = await makeRequest(valuesURL);
		if (res.status !== 200) {
			const {error} = await res.json();
			return Response.json({date, error}, {status: 500});
		}
		const {result: values} = await res.json();
		const data = keys.map((key: string, i: number) => {
			const slug = toSlug(key);
			const views = parseInt(values[i]);
			return {date, path: slug, views};
		});
		return Response.json({date, data}, {status: 200, headers: responseHeaders});
	} catch (error: any) {
		return Response.json({date, error: error?.message}, {status: 500});
	}
};
