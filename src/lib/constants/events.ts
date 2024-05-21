const EVENTS = [
	"clicked-resume",
	"clicked-dotfiles",
	"clicked-sitemap",
	"clicked-rssfeed",
	"clicked-twitter",
	"clicked-email",
	"clicked-facebook",
	"clicked-instagram",
	"clicked-youtube",
	"clicked-website",
	"clicked-discord",
	"clicked-github",
	"clicked-blog",
	"clicked-home",
	"clicked-about",
	"clicked-contact",
	"clicked-linkedin",
	"clicked-domain",
	"preferred-dark-mode",
	"preferred-light-mode",
] as const;

export const events = Object.fromEntries(EVENTS.map((event) => [event, event])) as {
	[K in (typeof EVENTS)[number]]: K;
};

export type Event = keyof typeof events;
