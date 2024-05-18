import type {Post, contentType} from "./schema";
import {filterPosts} from "./utils";
export type {Post} from "./schema";

export interface Heading {
	depth: number;
	slug: string;
	text: string;
}

export interface ReadTime {
	text: string;
	minutes: number;
	time: number;
	words: number;
}

export interface Render {
	headings: Heading[];
	remarkPluginFrontmatter: Record<string, any>;
}

interface getMattersOpts {
	method?: "astro" | "import";
	type?: contentType[];
}

export const getMatters = (all: any[], opts?: getMattersOpts) => {
	const {method = "astro", type = ["blog"]} = opts || {};
	// For some reason getCollection is working too slow on dev env,
	// So i am using Astro.glob for *.astro files and import.meta.glob for *.(ts,js) files
	const posts = (method === "import" ? Object.values(all) : all).map((p) => {
		const slug = p.file.split("/").pop().split(".").shift() as string;
		const post: Post = {
			...p.frontmatter,
			slug,
			published: new Date(p.frontmatter.published),
			modifided: new Date(p.frontmatter.modifided),
			headings: p?.getHeadings() || [],
			tags: p.frontmatter.tags || [],
			keywords: p.frontmatter.keywords || [],
			categories: p.frontmatter.categories || [],
			options: p.frontmatter.options || [],
		};
		return post;
	});
	return filterPosts({posts, type, sortby: "published", status: ["published"]});
};

export const toPosts = (items: any[], markdown = false): Post[] => {
	return items.map(({body, ...all}) => toPost({...all, body: markdown ? body : ""}));
};

export const toPost = (item: any, render?: Render): Post => {
	// when using getEntry
	return {
		...item.data,
		id: item.id,
		slug: item.slug,
		raw: item.body,
		headings: render?.headings ?? [],
		readtime: render?.remarkPluginFrontmatter.readtime,
		options: item.data.options || [],
	};
};

export function getTags(posts: Post[]): string[] {
	const tags = new Set<string>();
	posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
	return Array.from(tags);
}

export function getCategories(posts: Post[]): string[] {
	const categories = new Set<string>();
	posts.forEach((post) => post.categories.forEach((cat) => categories.add(cat)));
	return Array.from(categories);
}
