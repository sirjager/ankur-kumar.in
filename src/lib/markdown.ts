import {unified} from "unified";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkMermaid from "remark-mermaidjs";
import rehypeFormat from "rehype-format";
import {slug as slugify} from "github-slugger";
import * as cheerio from "cheerio";

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

export async function parseMarkdown(md: string, theme?: string) {
	const file = await unified()
		.use(remarkParse)
		.use(remarkMermaid, {mermaidConfig: {theme}})
		.use(remarkRehype, {allowDangerousHtml: true})
		.use(rehypeFormat)
		.use(rehypeStringify)
		.process(md);
	const html = file.toString();

	return await parseHtml(html);
}

export async function parseHtml(htmlString: string) {
	const $ = cheerio.load(htmlString);
	// INFO: Targeting all headings for table of content
	const allHeadings = $("h1, h2, h3, h4, h5, h6");
	const headings: Heading[] = [];
	allHeadings.each((_index, el) => {
		try {
			const text = $(el).text();
			const slug = slugify(text);
			const depth = Number(el.tagName.replace("h", ""));
			const heading = {slug, depth, text};
			headings.push(heading);

			// INFO: adding id to heading tag
			$(el).attr("id", slug);
			$(el).addClass("prose");
		} catch (error) {
			console.log({errors: error, method: "parser.parseHtml.headings"});
		}
	});

	$("h3").addClass("border border-border");

	// INFO: Targeting all <a> tags
	const allAnchors = $("a");
	allAnchors.each((_index, el) => {
		try {
			if (el.tagName === "a" && el.attribs.href) {
				if (el.attribs.href.includes("youtube.com/watch?v=")) {
					const youtubeLink = el.attribs.href;
					if (youtubeLink.endsWith("?player")) {
						const videoId = youtubeLink.split("v=")[1].split("?")[0];
						const iframe = $("<iframe></iframe>")
							.attr("width", "560")
							.attr("height", "315")
							.attr("src", `https://www.youtube.com/embed/${videoId}`)
							.attr("frameborder", "0")
							.attr(
								"allow",
								"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							)
							.attr("allowfullscreen", "")
							.addClass("youtube-player");
						const youtubeContainer = $("<div></div>").addClass("youtube-div");
						youtubeContainer.append(iframe);
						$(el).replaceWith(youtubeContainer);
					}
				}
			}
		} catch (error) {
			console.log({errors: error, method: "parser.parseHtml.player"});
		}
	});

	const html = $.html();
	return {html, headings};
}
