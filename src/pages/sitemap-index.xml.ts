/* eslint-disable quotes */
export const prerender = true;
import {site} from "@/lib/constants";
import type {APIRoute} from "astro";
import {getCollection} from "astro:content";

export const GET: APIRoute = async (req) => {
	const baseURL = req.url.origin;
	const sets: string[] = [];
	sets.push(`<?xml version="1.0" encoding="UTF-8"?>`);
	sets.push('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

	const blog = await getCollection("blog");
	const limit = site.sitemapSize;
	const total = blog.length;
	const pages = Math.ceil(total / limit);

	// fill the sitemap index
	for (let i = 1; i <= pages; i++) {
		const loc = `${baseURL}/blog/sitemap-${i}.xml`;
		const lastmod = new Date().toISOString();
		const sitemap = `<sitemap><loc>${loc}</loc><lastmod>${lastmod}</lastmod></sitemap>`;
		sets.push(sitemap);
	}

	// close the sitemap index
	sets.push("</sitemapindex>");
	const sitemapData = sets.join("\n");
	const headers = {
		"Content-Type": "text/xml; charset=UTF-8",
		"Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
	};
	return new Response(sitemapData, {status: 200, headers});
};
