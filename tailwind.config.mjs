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
	content: ["./src/**/*.{astro,html,svg,md,mdx,svelte,ts,tsx,vue}"],
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
				light: {
					...daisyThemes.light,
					"base-100": "#FFFFFF",
					"base-200": "#E2E8F0",
					"base-300": "#D1D5DB",
					"base-content": "#374151",
					primary: "#0EA5E9",
					"primary-content": "#111827",
					secondary: "#9CA3AF",
					"secondary-content": "#030712",
					accent: "#4F46E5", // indigo-700
					"accent-content": "#EEF2FF", // indigo-50
					neutral: "#E2E8F0",
					"neutral-content": "#4B5563",
					"--rounded-btn": "0.75rem",
					"--rounded-box": "0.75rem",
					"--rounded-badge": "1.0rem",
				},
			},
			{
				dark: {
					...daisyThemes.dark,
					"base-100": "#111827",
					"base-200": "#1f2937",
					"base-300": "#374151",
					"base-content": "#CBD5E1",
					primary: "#0ea5e9",
					"primary-content": "#111827",
					secondary: "#4b5563",
					"secondary-content": "#E5E7EB",
					accent: "#6479F2",
					"accent-content": "#111827",
					neutral: "#1f2937",
					"neutral-content": "#9CA3AF",
					"--rounded-btn": "0.75rem",
					"--rounded-box": "0.75rem",
					"--rounded-badge": "1.0rem",
				},
			},
		],
	},
	theme: {
		container: {
			padding: "2rem",
			center: true,
		},
		extend: {
			fontFamily: {
				title: ["Raleway Variable", ...defaultTheme.fontFamily.serif],
				body: ["Inter Variable", ...defaultTheme.fontFamily.serif],
			},
		},
	},
};
