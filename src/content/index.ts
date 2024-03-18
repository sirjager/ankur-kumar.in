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

export interface Post {
	status: "published" | "draft" | "archived" | "obsolete";
	slug: string;
	published: string;
	modified: string;
	title: string;
	description: string;
	html: string;
	readtime: ReadTime;
	headings: Heading[];
	Content: any;
	banner: string;
	banner_y: number;
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

export const getMarkdowns = (a: AstroGlob<Record<string, any>>[]) => {
	return a.map(
		(p) =>
			({
				...p.frontmatter,
				banner_y: p.frontmatter.banner_y || 0.5,
				Content: p.Content,
				headings: p.getHeadings(),
			}) as Post
	);
};
