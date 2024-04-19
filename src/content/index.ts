import type {Post} from "./config";
export type {Post} from "./config";

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

export const toPost = (item: any, render?: Render): Post => ({
	id: item.id,
	slug: item.slug,
	body: item.body,
	...item.data,
	headings: render?.headings ?? [],
	readtime: render?.remarkPluginFrontmatter.readtime,
});

export const toPosts = (items: any[]): Post[] => items.map((item) => toPost(item));
