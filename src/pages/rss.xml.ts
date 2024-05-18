import {site} from "@/lib/constants";
import rss from "@astrojs/rss";
import type {APIRoute} from "astro";

import {getMatters} from "@/content";
const blog: any = import.meta.glob("../../content/blog/*.md?(x)", {eager: true});
const posts = getMatters(blog, {method: "import", type: ["blog"]});

export const GET: APIRoute = async (context) => {
	return rss({
		title: site.title,
		stylesheet: "/styles/rss.xsl",
		description: site.description,
		site: context.site || "missing-site-url",
		customData: "<language>en-us</language>",
		items: posts.map((post) => {
			const taxonomies = new Set<string>();
			post.tags.forEach((tag) => taxonomies.add(tag));
			post.categories.forEach((cat) => taxonomies.add(cat));

			return {
				title: post.title,
				description: post.description,
				pubDate: post.published,
				link: `/blog/${post.slug}`,
				categories: Array.from(taxonomies),
			};
		}),
	});
};
