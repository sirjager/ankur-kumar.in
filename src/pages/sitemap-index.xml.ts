/* eslint-disable quotes */
import {getCategories, getTags} from "@/content";
import {site} from "@/lib/constants";
import type {APIRoute} from "astro";

import {getMatters} from "@/content";
const blog: any = import.meta.glob("../../content/blog/*.md?(x)", {eager: true});
const posts = getMatters(blog, {method: "import", type: ["blog"]});

export const GET: APIRoute = async (req) => {
	const baseURL = req.url.origin;
	const sitemaps: string[] = [];
	sitemaps.push(`<?xml version="1.0" encoding="UTF-8"?>`);
	sitemaps.push('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

	sitemaps.push(
		`<sitemap><loc>${baseURL}/</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`
	);
	sitemaps.push(
		`<sitemap><loc>${baseURL}/blog</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`
	);
	sitemaps.push(
		`<sitemap><loc>${baseURL}/about</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`
	);

	// TODO: enable when atleast one post is there
	// // Blog Posts Sitemap
	const limit = site.sitemapSize;
	// const total = posts.length;
	// const pages = Math.ceil(total / limit);
	// for (let i = 1; i <= pages; i++) {
	// 	const loc = `${baseURL}/blog/sitemap-${i}.xml`;
	// 	const lastmod = new Date().toISOString();
	// 	const sitemap = `<sitemap><loc>${loc}</loc><lastmod>${lastmod}</lastmod></sitemap>`;
	// 	sitemaps.push(sitemap);
	// }

	// Tags Sitemap
	const tags = getTags(posts);
	const tagsPages = Math.ceil(tags.length / limit);
	for (let i = 1; i <= tagsPages; i++) {
		const loc = `${baseURL}/tags/sitemap-${i}.xml`;
		const lastmod = new Date().toISOString();
		const sitemap = `<sitemap><loc>${loc}</loc><lastmod>${lastmod}</lastmod></sitemap>`;
		sitemaps.push(sitemap);
	}

	// Categories Sitemap
	const categories = getCategories(posts);
	const categoriesPages = Math.ceil(categories.length / limit);
	for (let i = 1; i <= categoriesPages; i++) {
		const loc = `${baseURL}/categories/sitemap-${i}.xml`;
		const lastmod = new Date().toISOString();
		const sitemap = `<sitemap><loc>${loc}</loc><lastmod>${lastmod}</lastmod></sitemap>`;
		sitemaps.push(sitemap);
	}

	// close the sitemap index
	sitemaps.push("</sitemapindex>");
	const sitemapData = sitemaps.join("\n");
	const headers = {
		"Content-Type": "text/xml; charset=UTF-8",
		"Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
	};
	return new Response(sitemapData, {status: 200, headers});
};
