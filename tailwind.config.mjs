import {themes} from "./src/lib/themes";
import defaultTheme from "tailwindcss/defaultTheme";
import daisyThemes from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	plugins: [
		require("@tailwindcss/container-queries"),
		require("@tailwindcss/typography"),
		require("daisyui"),
	],
	content: ["./public/*.{html,xsl}", "./src/**/*.{astro,html,svg,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	daisyui: {
		themeRoot: ":root",
		base: true,
		styled: true,
		utils: true,
		logs: false,
		prefix: "",
		themes: [
			...themes,
			{
				cupcake: {
					...daisyThemes.cupcake,
					"base-content": "#27272a",
					accent: "#F58840",
					"accent-content": "#FFFFFF",
					"--rounded-box": "0.55rem",
					"--rounded-btn": "0.55rem",
					"neutral-content": "#52525b",
				},
			},
			{
				business: {
					...daisyThemes.business,
					"base-100": "#121212",
					"base-200": "#21201E",
					"base-300": "#302e2c",
					"base-content": "#ECF0F1",
					accent: "#F58840",
					"accent-content": "#FFFFFF",
					"--rounded-box": "0.55rem",
					"--rounded-btn": "0.55rem",
				},
			},
		],
	},
	theme: {
		container: {
			padding: "2rem",
			center: true,
		},
		fontFamily: {
			rocksalt: ["Rock Salt", "cursive", ...defaultTheme.fontFamily.sans],
			body: ["Roboto", ...defaultTheme.fontFamily.sans],
		},
	},
};
