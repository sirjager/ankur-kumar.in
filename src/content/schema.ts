import {z, defineCollection} from "astro:content";
import type {Heading, ReadTime} from ".";

const STATUS = ["published", "draft", "archived", "obsolete"] as const;
export type status = (typeof STATUS)[number];

const CONTENT_TYPE = ["blog", "page"] as const;
export type contentType = (typeof CONTENT_TYPE)[number];

const OPTIONS = [
	"toc-disable",
	"toc-sticky-disable",
	"toc-opened",
	"comments-disable",
	"views-disable",
	"views-hidden",
] as const;
export type options = (typeof OPTIONS)[number];

export const blogSchema = z.object({
	type: z.enum(CONTENT_TYPE),

	banner: z.string().optional(),
	banner_x: z.number().optional().default(0.5),
	banner_y: z.number().optional().default(0.5),

	status: z.enum(STATUS).default("draft"),
	published: z.date(),
	modifided: z.date(),

	title: z.string().min(6).max(80),
	description: z.string().default(""),

	tags: z.array(z.string()).optional().default([]),
	categories: z.array(z.string()).optional().default([]),
	keywords: z.array(z.string()).optional().default([]),

	options: z.array(z.enum(OPTIONS)).optional(),
});

const blog = defineCollection({schema: blogSchema});
export const collections = {blog};

export type PostSchema = z.infer<typeof blogSchema>;
export interface Post extends PostSchema {
	id?: string;
	slug: string;
	body?: string;
	raw?: string;
	headings: Heading[];
	readtime?: ReadTime;
}
