import {defineConfig} from "astro/config";
import {loadEnv} from "vite";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import robots from "astro-robots-txt";
import node from "@astrojs/node";
import qwik from "@qwikdev/astro";
import mdx from "@astrojs/mdx";
// import cloudflare from "@astrojs/cloudflare";

import {toString} from "mdast-util-to-string";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkToc from "remark-toc";
import {rehypePrettyCodeOptions} from "./rehype-prettycode-opts";

const _ = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const {PORTFOLIO_APP_URL, NODE_ENV} = _;
const SITE_URL = PORTFOLIO_APP_URL;

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	trailingSlash: "never",
	devToolbar: {
		enabled: NODE_ENV === "development",
	},
	integrations: [
		mdx({
			optimize: true,
			extendMarkdownConfig: true,
		}),
		qwik(),
		tailwind(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		robots({
			sitemap: `${SITE_URL}/sitemap-index.xml`,
			policy: [{userAgent: "*", disallow: ["/admin"]}],
		}),
	],
	experimental: {
		clientPrerender: true,
		contentCollectionCache: NODE_ENV === "development" ? false : true,
	},
	vite: {
		logLevel: NODE_ENV === "development" ? "info" : undefined,
		cacheDir: "./.cache",
	},
	prefetch: {
		defaultStrategy: "viewport",
	},
	output: "hybrid",
	adapter: node({mode: "standalone"}),
	// adapter: cloudflare({imageService: "cloudflare"}),
	image: {
		remotePatterns: [{protocol: "https"}, {protocol: "http"}],
	},
	markdown: {
		gfm: true,
		smartypants: true,
		syntaxHighlight: false,
		extendDefaultPlugins: true,
		remarkRehype: {allowDangerousHtml: true},
		remarkPlugins: [readtime, remarkToc],
		rehypePlugins: [
			[
				rehypeAutolinkHeadings,
				{
					behavior: "wrap",
					properties: {
						className: [""],
					},
				},
			],
			// pretty code highlight
			[rehypePrettyCode, rehypePrettyCodeOptions],
		],
	},
});

function readtime() {
	return function (tree, {data}) {
		// eslint-disable-next-line qwik/loader-location
		const textOnPage = toString(tree);
		data.astro.frontmatter.readtime = readingTime(textOnPage);
	};
}
