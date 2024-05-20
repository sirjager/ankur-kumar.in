export const site = {
	title: "Ankur Kumar",
	description:
		"Welcome to my personal developer portfolio! Here, I dive deep into various aspects of software development, sharing my experiences and insights along the way. From exploring system design, web development, and backend server creation to prioritizing security and delving into Linux customization and open-source software, I'm excited to share my journey with you. Join me as we uncover the power of scripting, automation, and workflows, where every line of code brings us closer to crafting secure, innovative solutions and shaping the digital landscape of tomorrow.",
	blog: {
		title:
			"Articles on my journey through software development, scripting, Linux, and tech in general.",
		description:
			"Embark on a journey through the ever-evolving landscape of programming with me. From my humble beginnings in 2019, I've delved into the complexities of software development and Linux mastery, discovering new realms of code and system environments.",
		readmore: [
			"My exploration kicked off with Dart and Flutter, where I dabbled in app development before transitioning to Python and FastAPI for crafting APIs. Venturing further, I explored the world of web development, embracing frameworks like Next.js, Qwik, and Astro. However, it wasn't until 2022 that Go stole the spotlight as my preferred language for backend servers, CLI tools, and gRPC services. But my journey doesn't stop there.",
			"Alongside my coding endeavors, I'll offer insights into my transition from a Windows user to Linux aficionado. Join me as I navigate the intricacies of tiling window managers and delve into various Linux customizations.",
		],
	},
	lang: "en-US",
	author: {
		firstName: "Ankur",
		lastName: "Kumar",
		fullName: "Ankur Kumar",
		email: "contact@ankur-kumar.in",
		twitter: "@sirjager",
		image: "https://i.imgur.com/MlFSSy7.png",
		programming: [
			"JavaScript",
			"TypeScript",
			"Python",
			"Golang",
			"Dart",
			"HTML",
			"CSS",
			"Bash",
			"SQL",
		],
		technologies: [
			"Git",
			"Docker",
			"Web Scraping",
			"Linux",
			"Vercel",
			"Cloudflare",
			"Postman",
			"Shell Scripting",
		],
		databases: ["Postgres", "MySQL", "SQLite", "MongoDB", "Supabase", "Firebase", "Directus"],
		frameworks: [
			"gRPCs",
			"REST API",
			"FastAPI",
			"Echo",
			"Gin",
			"Astro",
			"NextJS",
			"Qwik",
			"TailwindCSS",
			"DaisyUI",
			"Shadcn",
			"MantineUI",
		],
	},
	links: {
		rssfeed: "/rss.xml",
		giscus: "sirjager/ankur-kumar.in-discussions",
		sitemap: "/sitemap-index.xml",
		domain: "ankur-kumar.in",
		website: "https://ankur-kumar.in",
		github: "https://github.com/sirjager",
		contact: "mailto:contact@ankur-kumar.in",
		twitter: "https://twitter.com/sirjager",
		twitterHandle: "@sirjager",
		instagram: "https://www.instagram.com/sirjager",
		dotfiles: "https://github.com/sirjager/dotfiles",
		linkedin: "https://www.linkedin.com/in/5321ankur",
	},
};

export const socials = [
	{
		name: "Twitter",
		url: site.links.twitter,
		color: "#1DA1F2",
	},
	{
		name: "Github",
		url: site.links.github,
		color: "#000000",
	},
	{
		name: "LinkedIn",
		url: site.links.linkedin,
		color: "#0077B5",
	},
	{
		name: "Email",
		url: site.links.contact,
		color: "#FFFFFF",
	},
];

export const navlinks = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Blog",
		href: "/blog",
	},
	// {
	// label: "About",
	// href: "/about",
	// },
];

const ANALYTICS_EVENTS = [
	"clickedResume",
	"clickedDotfiles",
	"clickedSitemap",
	"clickedRssFeed",
	"clickedTwitter",
	"clickedEmail",
	"clickedFacebook",
	"clickedInstagram",
	"clickedYouTube",
	"clickedWebsite",
	"clickedDiscord",
	"clickedGitHub",
	"clickedBlog",
	"clickedHome",
	"clickedAbout",
	"clickedContact",
	"clickedLinkedIn",
	"clickedDomain",
] as const;
export const analyticsEvents = Object.fromEntries(
	ANALYTICS_EVENTS.map((event) => [event, event])
) as {[K in (typeof ANALYTICS_EVENTS)[number]]: K};
export type AnalyticsEvent = keyof typeof analyticsEvents;

export const links = {
	website: {
		name: "Website",
		href: "https://ankur-kumar.in",
		icon: "tabler:brand-chrome",
		label: "Visit Website",
		color: "#6479F2",
		event: analyticsEvents.clickedWebsite,
	},
	sitemap: {
		name: "Sitemap",
		href: "/sitemap-index.xml",
		icon: "tabler:sitemap",
		label: "Check out Sitemap",
		color: "#135D66",
		event: analyticsEvents.clickedSitemap,
	},
	domain: {
		name: "Ankur Kumar",
		href: "https://ankur-kumar.in",
		icon: "tabler:world-www",
		label: "Visit My Website",
		color: "#6479F2",
		event: analyticsEvents.clickedDomain,
	},
	dotfiles: {
		name: "Dotfiles",
		href: "https://github.com/sirjager/dotfiles",
		icon: "tabler:file-code",
		label: "Check out Dotfiles",
		color: "#6e5494",
		event: analyticsEvents.clickedDotfiles,
	},
	discord: {
		name: "Discord Server",
		icon: "tabler:brand-discord",
		label: "Join Discord Server",
		href: "https://discord.gg/XBqUKeE",
		color: "#7289DA",
		event: analyticsEvents.clickedDiscord,
	},
	github: {
		name: "Github",
		href: "https://github.com/sirjager",
		icon: "tabler:brand-github",
		label: "Follow on Github",
		color: "#6e5494",
		event: analyticsEvents.clickedGitHub,
	},
	twitter: {
		name: "Twitter",
		icon: "tabler:brand-x",
		label: "Follow on Twitter",
		href: "https://twitter.com/sirjager",
		color: "#1da1f2",
		event: analyticsEvents.clickedTwitter,
	},
	youtube: {
		name: "YouTube",
		icon: "tabler:brand-youtube",
		label: "Follow on YouTube",
		href: "https://www.youtube.com/@SirJagerYT",
		color: "#FF0000",
		event: analyticsEvents.clickedYouTube,
	},
	linkedin: {
		name: "LinkedIn",
		icon: "tabler:brand-linkedin",
		label: "Follow on LinkedIn",
		href: "https://www.linkedin.com/in/5321ankur",
		color: "#0077B5",
		event: analyticsEvents.clickedLinkedIn,
	},
	instagram: {
		name: "Instagram",
		icon: "tabler:brand-instagram",
		label: "Follow on Instagram",
		href: "https://www.instagram.com/sirjager",
		color: "#E1306C",
		event: analyticsEvents.clickedInstagram,
	},
	email: {
		name: "Email",
		icon: "tabler:mail",
		label: "Email me",
		color: "#EA4335",
		href: "mailto:contact@ankur-kumar.in",
		event: analyticsEvents.clickedEmail,
	},
	rss: {
		name: "RSS",
		icon: "tabler:rss",
		label: "Subscribe to RSS",
		color: "#FB923C",
		href: "/rss.xml",
		event: analyticsEvents.clickedRssFeed,
	},
} as const;

export type MyLink = (typeof links)[keyof typeof links];

export function getMyLinks(commaSeperatedLinks: string) {
	const names = commaSeperatedLinks.split(",");
	const res = names.map((name) => (links as any)[name.trim()]).filter((s) => s !== undefined);
	return res as MyLink[];
}
