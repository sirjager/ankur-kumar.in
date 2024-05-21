import {events} from "./events";

export const links = {
	home: {
		name: "Home",
		href: "/",
		icon: "tabler:home",
		label: "Home",
		color: "#6479F2",
		event: events["clicked-home"],
	},

	about: {
		name: "About",
		href: "/about-me",
		icon: "cib:about-me",
		label: "About Me",
		color: "#6479F2",
		event: events["clicked-about"],
	},
	blog: {
		name: "Blog",
		href: "/blog",
		icon: "tabler:brand-blogger",
		label: "Blog",
		color: "#FFA105",
		event: events["clicked-blog"],
	},
	resume: {
		name: "Resume",
		icon: "tabler:file-text",
		label: "Download Resume",
		color: "#5AB2FF",
		target: "_blank",
		href: "/pdfs/ankur-kumar-resume.pdf",
		event: events["clicked-resume"],
	},
	website: {
		name: "Website",
		href: "https://ankur-kumar.in",
		icon: "tabler:brand-chrome",
		label: "Visit Website",
		color: "#6479F2",
		event: events["clicked-website"],
	},
	sitemap: {
		name: "Sitemap",
		href: "/sitemap-index.xml",
		icon: "tabler:sitemap",
		label: "Check out Sitemap",
		color: "#135D66",
		event: events["clicked-sitemap"],
	},
	domain: {
		name: "Ankur Kumar",
		href: "ankur-kumar.in",
		icon: "tabler:world-www",
		label: "Visit My Website",
		color: "#6479F2",
		event: events["clicked-domain"],
	},
	dotfiles: {
		name: "Dotfiles",
		href: "https://github.com/sirjager/dotfiles",
		icon: "tabler:file-code",
		label: "Check out Dotfiles",
		color: "#6e5494",
		event: events["clicked-dotfiles"],
	},
	discord: {
		name: "Discord Server",
		icon: "tabler:brand-discord",
		label: "Join Discord Server",
		href: "https://discord.gg/XBqUKeE",
		color: "#7289DA",
		event: events["clicked-discord"],
	},
	github: {
		name: "Github",
		href: "https://github.com/sirjager",
		icon: "tabler:brand-github",
		label: "Follow on Github",
		color: "#6e5494",
		event: events["clicked-github"],
	},
	twitter: {
		name: "Twitter",
		icon: "tabler:brand-x",
		label: "Follow on Twitter",
		href: "https://twitter.com/sirjager",
		color: "#1da1f2",
		event: events["clicked-twitter"],
	},
	youtube: {
		name: "YouTube",
		icon: "tabler:brand-youtube",
		label: "Follow on YouTube",
		href: "https://www.youtube.com/@SirJagerYT",
		color: "#FF0000",
		event: events["clicked-youtube"],
	},
	linkedin: {
		name: "LinkedIn",
		icon: "tabler:brand-linkedin",
		label: "Follow on LinkedIn",
		href: "https://www.linkedin.com/in/5321ankur",
		color: "#0077B5",
		event: events["clicked-linkedin"],
	},
	instagram: {
		name: "Instagram",
		icon: "tabler:brand-instagram",
		label: "Follow on Instagram",
		href: "https://www.instagram.com/sirjager",
		color: "#E1306C",
		event: events["clicked-instagram"],
	},
	email: {
		name: "Email",
		icon: "tabler:mail",
		label: "Email me",
		color: "#EA4335",
		href: "mailto:contact@ankur-kumar.in",
		event: events["clicked-email"],
	},
	rss: {
		name: "RSS",
		icon: "tabler:rss",
		label: "Subscribe to RSS",
		color: "#FB923C",
		href: "/rss.xml",
		event: events["clicked-rssfeed"],
	},
} as const;

export type MyLink = (typeof links)[keyof typeof links];

export function getMyLinks(commaSeperatedLinks: string) {
	const names = commaSeperatedLinks.split(",");
	const res = names.map((name) => (links as any)[name.trim()]).filter((s) => s !== undefined);
	return res as MyLink[];
}
