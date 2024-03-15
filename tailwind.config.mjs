import {themes} from "./src/lib/themes";
import defaultTheme from "tailwindcss/defaultTheme";

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
		themes: themes,
	},
	theme: {
		container: {
			padding: "2rem",
			center: true,
		},
		fontFamily: {
			rocksalt: ["Rock Salt", "cursive", ...defaultTheme.fontFamily.sans],
			roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
		},
	},
};
