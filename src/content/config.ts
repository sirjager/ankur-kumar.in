import {z, defineCollection} from "astro:content";
import type {Heading, ReadTime} from ".";

const STATUS = ["published", "draft", "archived", "obsolete"] as const;
export type status = (typeof STATUS)[number];

export const blogSchema = z.object({
	banner: z.string(),
	banner_x: z.number().default(0.5),
	banner_y: z.number().default(0.5),
	status: z.enum(STATUS).default("draft"),
	published: z.date(),
	modifided: z.date(),
	title: z.string().min(6).max(80),
	description: z.string().default(""),
	tags: z.array(z.string()),
});

const blog = defineCollection({schema: blogSchema});
export const collections = {blog};

export type PostSchema = z.infer<typeof blogSchema>;
export interface Post extends PostSchema {
	id: string;
	slug: string;
	body: string;
	headings: Heading[];
	readtime?: ReadTime;
}
