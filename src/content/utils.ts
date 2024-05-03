import type {Post, status} from "./schema";

export interface filterOpts {
	posts?: Post[];
	slugs?: string[];
	status?: status[];
	categories?: string[];
	tags?: string[];
	limit?: number;
	page?: number;
	randomize?: boolean;
	sortby?: "published" | "description" | "modifided" | "title" | "slugs";
}

export function filterPosts(opts?: filterOpts): Post[] {
	const posts: Post[] = opts?.posts || [];
	if (posts.length < 2) return posts;

	const status = opts?.status || [];
	const {limit, page} = opts || {};
	const {randomize = false, sortby = "published"} = opts || {};

	const slugs = opts?.slugs?.map((s) => s.replaceAll(" ", "")) || [];
	const tags = opts?.tags?.map((s) => s.replaceAll(" ", "")) || [];
	const categories = opts?.tags?.map((s) => s.replaceAll(" ", "")) || [];

	// Filter posts based on the specified criteria
	let filtered: Post[] = posts;

	if (status.length > 0) {
		filtered = filtered.filter((post) => status.includes(post.status));
	}

	if (slugs.length > 0) {
		filtered = filtered.filter((post) => slugs.includes(post.slug));
	}

	if (categories.length > 0) {
		filtered = filtered.filter((post) => categories.includes(post.category));
	}

	if (tags.length > 0) {
		filtered = filtered.filter((post) => post.tags.some((slug) => tags.includes(slug)));
	}

	// Sort the filtered posts
	if (sortby === "slugs") {
		filtered.sort((a, b) => a.slug.localeCompare(b.slug));
	} else if (sortby === "description") {
		filtered.sort((a, b) => a.description.localeCompare(b.description));
	} else if (sortby === "modifided") {
		filtered.sort((a, b) => b.modifided.getTime() - a.modifided.getTime());
	} else if (sortby === "title") {
		filtered.sort((a, b) => a.title.localeCompare(b.title));
	} else {
		filtered.sort((a, b) => b.published.getTime() - a.published.getTime());
	}

	// Randomize if specified
	if (randomize) {
		for (let i = filtered.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[filtered[i], filtered[j]] = [filtered[j], filtered[i]];
		}
	}

	// Pagination logic
	if (page && limit && page > 0 && limit > 0) {
		const startIndex = (page - 1) * limit;
		let endIndex = startIndex + limit;
		// Ensure endIndex does not exceed the number of posts
		if (endIndex > filtered.length) {
			endIndex = filtered.length;
		}
		filtered = filtered.slice(startIndex, endIndex);
	}

	return filtered;
}
