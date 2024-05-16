import {site} from "@/lib/constants";
import type {APIRoute} from "astro";
import rss from "@astrojs/rss";

import {getMatters, type Post} from "@/content";
const blog: any = import.meta.glob("../../content/blog/*.md?(x)", {eager: true});
const posts: Post[] = getMatters<Post>(blog, "import");

export const GET: APIRoute = async (context) => {
	return rss({
		title: site.title,
		stylesheet: "/styles/rss.xsl",
		description: site.description,
		site: context.site || "missing-site-url",
		customData: "<language>en-us</language>",
		items: posts.map((post) => {
			const taxonomies = new Set<string>();
			taxonomies.add(post.category);
			post.tags.forEach((tag) => taxonomies.add(tag));

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
