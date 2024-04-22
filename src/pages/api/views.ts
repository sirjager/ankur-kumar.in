import {Redis} from "ioredis";
import type {APIRoute} from "astro";

export const prerender = false;

const toKey = (slug: string) => {
	const appname = import.meta.env.APP_NAME;
	const key = `${appname}:views:${slug}`;
	return key;
};

const redis = new Redis(import.meta.env.REDIS_CONNECTION_STRING);

export const GET: APIRoute = async ({url}) => {
	try {
		const path = url.searchParams.get("path");
		if (!path) return Response.json({error: "path is not provided"}, {status: 400});
		const views = await redis.incr(toKey(path));
		return Response.json({path, views}, {status: 200});
	} catch (error: any) {
		return Response.json({error: error?.message}, {status: 500});
	}
};

export const POST: APIRoute = async ({url, request}) => {
	try {
		const path = url.searchParams.get("path");
		if (!path) return Response.json({error: "path is not provided"}, {status: 400});

		const apiKey: string = import.meta.env.COUNTER_API_KEY;
		if (!apiKey || apiKey.length <= 12) {
			return Response.json({error: "proper key is not provided"}, {status: 500});
		}

		const auth = request.headers.get("authorization");
		if (!auth) return Response.json({error: "Unauthorized"}, {status: 401});
		const token = auth.split(" ");

		// invalid token
		if (token.length !== 2) {
			return Response.json({error: "Unauthorized"}, {status: 401});
		}

		// wrong key
		if (token[1] !== apiKey) {
			return Response.json({error: "Unauthorized"}, {status: 401});
		}

		const views = await redis.incr(toKey(path));
		return Response.json({path, views}, {status: 200});
	} catch (error: any) {
		console.log(error);
		return Response.json({error: error?.message}, {status: 500});
	}
};
