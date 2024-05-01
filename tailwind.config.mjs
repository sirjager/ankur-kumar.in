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
	content: ["./src/**/*.{astro,html,svg,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
					accent: "#F58840",
					"accent-content": "#FFFFFF",
					"--rounded-box": "0.75rem",
					"--rounded-btn": "0.7rem",
				},
			},
			{
				business: {
					...daisyThemes.business,
					"base-100": "#21201E",
					"base-200": "#323130",
					"base-300": "#302e2c",
					"base-content": "#ECF0F1",
					accent: "#F58840",
					"accent-content": "#FFFFFF",
					"--rounded-box": "0.75rem",
					"--rounded-btn": "0.7rem",
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
