/* eslint-disable quotes */
import {getCategories, toPosts} from "@/content";
import {site} from "@/lib/constants";
import type {APIRoute} from "astro";
import {getCollection} from "astro:content";

export const getStaticPaths = async () => {
	const blog = await getCollection("blog");
	const posts = toPosts(blog);
	const cats = getCategories(posts);
	const limit = site.sitemapSize;
	const pages = Math.ceil(cats.length / limit);
	return Array.from({length: pages}, (_, i) => ({
		params: {sitemap: `sitemap-${i + 1}`},
	}));
};

export const GET: APIRoute = async (req) => {
	const baseURL = req.url.origin;
	const {sitemap} = req.params;
	if (!sitemap) return new Response(null, {status: 404});

	const sets: string[] = [];
	sets.push(`<?xml version="1.0" encoding="UTF-8"?>`);
	sets.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

	const pageNo = parseInt(sitemap.replace("sitemap-", ""));
	const limit = site.sitemapSize;

	const blog = await getCollection("blog");
	const posts = toPosts(blog);
	const cats = getCategories(posts);
	const paginated = cats.slice(limit * (pageNo - 1), limit * pageNo);

	// fill the url set
	paginated.forEach((slug) => {
		const loc = encodeURI(`${baseURL}/categories/${slug}`);
		const lastmod = new Date().toISOString();
		const changefreq = "weekly";
		const priority = 0.7;
		const string = `
      <url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>`;
		sets.push(string);
	});

	// close the url set
	sets.push("</urlset>");
	const sitemapData = sets.join("\n");
	const headers = {
		"Content-Type": "text/xml; charset=UTF-8",
		"Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
	};
	return new Response(sitemapData, {status: 200, headers});
};
