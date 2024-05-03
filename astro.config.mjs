import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import qwik from "@qwikdev/astro";
import robots from "astro-robots-txt";
import webmanifest from "astro-webmanifest";
import {defineConfig} from "astro/config";
import {loadEnv} from "vite";

// adapters
import cloudflare from "@astrojs/cloudflare";

import {toString} from "mdast-util-to-string";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkToc from "remark-toc";
import {rehypePrettyCodeOptions} from "./rehype-prettycode-opts";
import {site} from "./src/lib/constants";

const _ = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const {APP_URL} = _;

// https://astro.build/config
export default defineConfig({
	site: APP_URL,
	trailingSlash: "ignore",
	devToolbar: {enabled: false},
	integrations: [
		mdx({
			optimize: true,
			extendMarkdownConfig: true,
		}),
		qwik(),
		svelte(),
		tailwind(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		robots({
			sitemap: `${APP_URL}/sitemap-index.xml`,
			policy: [{userAgent: "*", disallow: ["/admin"]}],
		}),
		webmanifest({
			name: site.title,
			lang: site.lang,
			start_url: "",
			description: site.description,
			display: "standalone",
			theme_color: "#FFFFFF",
			background_color: "#ffffff",
			icon: "./public/favicon.ico",
			icons: [
				{src: "./public/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png"},
				{src: "./public/icons/favicon-16x16.png", sizes: "16x16", type: "image/png"},
				{src: "./public/icons/favicon-32x32.png", sizes: "32x32", type: "image/png"},
				{src: "./public/icons/android-chrome-48x48.png", sizes: "48x48", type: "image/png"},
				{src: "./public/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png"},
				{src: "./public/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png"},
			],
		}),
	],
	prefetch: {
		defaultStrategy: "viewport",
	},
	output: "hybrid",
	adapter: cloudflare({
		wasmModuleImports: true,
	}),
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
