import {defineConfig} from "astro/config";
import {loadEnv} from "vite";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import robots from "astro-robots-txt";
import compress from "astro-compress";
import node from "@astrojs/node";
import qwik from "@qwikdev/astro";

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
		qwik(),
		tailwind(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		compress({
			Image: false,
		}),
		robots({
			sitemap: `${SITE_URL}/sitemap-index.xml`,
			popolicy: [{userAgent: "*", disallow: ["/admin"]}],
		}),
	],
	experimental: {
		clientPrerender: true,
		contentCollectionCache: true,
	},
	vite: {
		logLevel: NODE_ENV === "development" ? "info" : undefined,
	},
	prefetch: {
		defaultStrategy: "viewport",
	},
	output: "hybrid",
	adapter: node({
		mode: "standalone",
	}),
});
