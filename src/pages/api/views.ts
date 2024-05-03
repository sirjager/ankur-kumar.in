import {redis, toSlug, toKey} from "@/lib/redis";
import type {APIRoute} from "astro";

export const prerender = false;

export const GET: APIRoute = async ({url}) => {
	try {
		const path = url.searchParams.get("path");
		if (!path) return Response.json({error: "path is not provided"}, {status: 400});

		if (path === "*") {
			const keys = await redis.keys(toKey("*"));
			const values = await redis.mget(keys);
			const keyvals = keys.map((key, i) => {
				const views = parseInt(values[i] || "0");
				return {slug: toSlug(key), views};
			});
			return Response.json(keyvals, {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "public, s-maxage=60, stale-while-revalidate=25",
				},
			});
		}

		const views = await redis.incr(toKey(path));
		return Response.json(
			{path, views},
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "public, s-maxage=60, stale-while-revalidate=25",
				},
			}
		);
	} catch (error: any) {
		return Response.json({error: error?.message}, {status: 500});
	}
};
