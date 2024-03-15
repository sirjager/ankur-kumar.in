import {defineCollection, z} from "astro:content";

const blog = defineCollection({
	schema: z.object({
		type: z.enum(["article"]),
		status: z.enum(["draft", "published", "archived", "obsolete"]),
		published: z.date(),
		modifided: z.date(),

		title: z.string(),
		description: z.string(),

		image: z.object({
			title: z.string(),
			preview: z.string(),
			featured: z.string(),
			alt: z.string().optional(),
			caption: z.string().optional(),
		}),

		author: z.object({
			name: z.string(),
			slug: z.string(),
			about: z.string().optional(),
			image: z.string().optional(),
		}),

		tags: z.string().array().default([]),
		categories: z.string().array().default([]),
	}),
});

const pages = defineCollection({
	schema: z.object({
		type: z.enum(["pages"]),
		modifided: z.date(),
		title: z.string(),
		description: z.string(),
	}),
});

export const collections = {blog, pages};

export interface Image {
	featured: string;
	preview: string;
	title: string;
	alt?: string;
	caption?: string;
}

export interface Author {
	name: string;
	slug: string;
	about?: string;
	image?: string;
}

export type status = "draft" | "published" | "archived" | "obsolete";

export interface ReadTime {
	text: string;
	minutes: number;
	time: number;
	words: number;
}

export interface PostFrontMatter {
	readonly type: string;
	readonly status: status;
	readonly published: Date;
	readonly modifided: Date;
	readonly slug: string;
	readonly title: string;
	readonly author: Author;
	readonly description: string;
	readonly image: Image;
	readonly readtime: ReadTime;
	readonly tags: string[];
	readonly categories: string[];
	readonly headings: {depth: number; slug: string; text: string}[];
}

export interface PageFrontMatter {
	readonly type: string;
	readonly slug: string;
	readonly title: string;
	readonly description: string;
	readonly modifided: string;
}

export interface MarkdownInstance<T extends Record<string, any>> {
	/* Any data specified in this file's YAML frontmatter */
	frontmatter: T;
	/* The file path of this file */
	file: string;
	/* The rendered path of this file */
	url: string | undefined;
	/* Astro Component that renders the contents of this file */
	Content: any;
	/* Function that returns an array of the h1...h6 elements in this file */
	getHeadings(): Promise<{depth: number; slug: string; text: string}[]>;
}
