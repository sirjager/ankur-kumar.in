import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import svelte from "@astrojs/svelte";
import qwik from "@qwikdev/astro";
import tailwind from "@astrojs/tailwind";
import robots from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import webmanifest from "astro-webmanifest";
import {defineConfig} from "astro/config";
import {astroImageTools} from "astro-imagetools";
import compressor from "astro-compressor";
import astroIcon from "astro-icon";

// adapters
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";

import {toString} from "mdast-util-to-string";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkToc from "remark-toc";
import {rehypePrettyCodeOptions} from "./rehype-prettycode-opts";
import {links, site} from "./src/lib/constants";

const siteURL =
	process.env.NODE_ENV === "development" ? "http://localhost:4321" : links.website.href;

// https://astro.build/config
export default defineConfig({
	site: siteURL,
	trailingSlash: "ignore",
	devToolbar: {enabled: false},
	integrations: [
		mdx({
			gfm: true,
			optimize: true,
			smartypants: true,
			syntaxHighlight: "prism",
			extendMarkdownConfig: true,
		}),
		qwik(),
		svelte(),
		astroIcon(),
		astroImageTools,
		tailwind(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		sitemap({
			priority: 0.7,
			entryLimit: 10000,
			changefreq: "weekly",
			lastmod: new Date(),
			filter: (page) => !page.includes(`${siteURL}/admin`) && !page.includes(`${siteURL}/api`),
		}),
		robots({
			sitemap: `${siteURL}${links.sitemap.href}`,
			policy: [{userAgent: "*", disallow: ["/admin", "/api"]}],
		}),
		webmanifest({
			name: site.title,
			lang: site.lang,
			start_url: "/",
			description: site.description,
			display: "standalone",
			icon: "./public/icons/android-chrome-512x512.png",
			icons: [
				{src: "./public/icons/favicon-16x16.png", sizes: "16x16", type: "image/png"},
				{src: "./public/icons/favicon-32x32.png", sizes: "32x32", type: "image/png"},
				{src: "./public/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png"},
				{src: "./public/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png"},
				{src: "./public/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png"},
			],
		}),
		compressor({brotli: true}),
	],
	prefetch: {defaultStrategy: "viewport"},
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
			[rehypeAutolinkHeadings, {behavior: "wrap", properties: {className: [""]}}],
			[rehypePrettyCode, rehypePrettyCodeOptions],
		],
	},
	output: "hybrid",
	adapter:
		process.env.NODE_ENV !== "development" ? vercel({maxDuration: 60}) : node({mode: "standalone"}),
	build: {
		// https://docs.astro.build/en/reference/configuration-reference
		inlineStylesheets: "never",
		assets: "_assets",
	},
});

function readtime() {
	return function (tree, {data}) {
		// eslint-disable-next-line qwik/loader-location
		const textOnPage = toString(tree);
		data.astro.frontmatter.readtime = readingTime(textOnPage);
	};
}
