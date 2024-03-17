import {slug as slugify} from "github-slugger";
import * as cheerio from "cheerio";
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import Markdoc from "@markdoc/markdoc";
import readingTime from "reading-time";

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

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const markdocConfigs = () => {
	const configs = {};
	return configs;
};

const markdoc = (md?: string | null, editor?: string | null) => {
	let _html = md || "";
	if (!editor || editor === "markdown") {
		const ast = Markdoc.parse(md || "");
		const configs = markdocConfigs();
		const content = Markdoc.transform(ast, configs);
		_html = Markdoc.renderers.html(content);
	}
	const data = parseHtml(_html);
	const readtime: ReadTime = readingTime(_html);
	return {...data, readtime};
};

export function parseHtml(htmlString: string) {
	const $ = cheerio.load(htmlString);

	// INFO: Targeting all headings for table of content
	const allHeadings = $("h1, h2, h3, h4, h5, h6");
	const headings: Heading[] = [];
	allHeadings.each((_index, h: any) => {
		try {
			const text = $(h).text();
			const slug = slugify(text);
			if (h.tagName) {
				const depth = Number(h.tagName.replace("h", ""));
				const heading = {slug, depth, text};
				headings.push(heading);

				// INFO: adding id to heading tag
				$(h).attr("id", slug);
				$(h).addClass(cn("prose"));
			}
		} catch (_) {
			//
		}
	});

	const html = $.html();

	return {html, headings};
}

export default markdoc;
