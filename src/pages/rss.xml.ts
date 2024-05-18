import {site} from "@/lib/constants";
import rss from "@astrojs/rss";
import type {APIRoute} from "astro";
import {getMatters} from "@/content";

export const GET: APIRoute = async (context) => {
	const blog: any = import.meta.glob("../content/blog/*.md?(x)", {eager: true});
	const posts = getMatters(blog, {method: "import", type: ["blog"]});
	return rss({
		site:
			process.env.NODE_ENV === "development"
				? "http://localhost:4321"
				: context.site || "missing-site-url",
		title: site.title,
		stylesheet: "/styles/rss.xsl",
		description: site.description,
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
