import {Redis} from "ioredis";
export const redis = new Redis(import.meta.env.REDIS_CONNECTION_STRING);

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
