import type {Post} from "./schema";
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

export const toPost = (item: any, render?: Render): Post => {
	// Modif post data here if needed
	return {
		id: item.id,
		slug: item.slug,
		body: item.body,
		...item.data,
		headings: render?.headings ?? [],
		readtime: render?.remarkPluginFrontmatter.readtime,
	};
};

export const toPosts = (items: any[], markdown = false): Post[] => {
	return items.map(({body, ...all}) => toPost({...all, body: markdown ? body : ""}));
};

export function getTags(posts: Post[]): string[] {
	const tags = new Set<string>();
	posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
	return Array.from(tags);
}

export function getCategories(posts: Post[]): string[] {
	const categories = new Set<string>();
	posts.forEach((post) => categories.add(post.category));
	return Array.from(categories);
}
