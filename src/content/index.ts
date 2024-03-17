import {slug as slugify} from "github-slugger";
import markdoc from "@/lib/markdoc";
import type {ReadTime, Heading} from "@/lib/markdoc";

export interface Post {
	status: "published" | "draft" | "archived" | "obsolete";
	slug: string;
	published: string;
	modified: string;
	title: string;
	description: string;
	html: string;
	markdown: string;
	readtime: ReadTime;
	headings: Heading[];

	banner?: string;
	banner_y?: number;
}

export interface AstroGlob<T extends Record<string, any>> {
	/* Any data specified in this file's YAML frontmatter */
	frontmatter: T;
	/* The file path of this file */
	file: string;
	/* The rendered path of this file */
	url: string | undefined;
	/* Astro Component that renders the contents of this file */
	Content: any;
	/* Function that returns raw markdown */
	rawContent(): string;
	/* Function that returns an compiled version of markdown */
	compiledContent(): string;
	/* Function that returns an array of the h1...h6 elements in this file */
	getHeadings(): Heading[];
}

export const getMarkdowns = (a: AstroGlob<Record<string, any>>[], withContent?: boolean) =>
	a.map((p) => {
		const filename = p.file.split("/").pop()!.split(".")[0];
		const slug = slugify(p.frontmatter.slug || filename);
		let post: Post = {...(p.frontmatter as any), slug};
		if (withContent) {
			const markdown = p.rawContent();
			const {html, ...other} = markdoc(markdown);
			post = {...post, ...other, markdown, html};
		}
		if (post.banner?.startsWith("public/")) {
			post.banner = post.banner.replace("public", "");
		}
		return post;
	});
