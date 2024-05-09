export function themeMode(theme: string | undefined): "dark" | "light" {
	switch (theme) {
		case "dracula":
		case "business":
		case "synthwave":
		case "halloween":
		case "forest":
		case "black":
		case "luxury":
		case "night":
		case "coffee":
		case "dark":
		case "dim":
		case "sunset":
		case "jager":
			return "dark";
		default:
			return "light";
	}
}

export const themes = [
	"dark",
	"light",
	// "cupcake",
	// "business",
	// "business",
	// "bumblebee",
	// "emerald",
	// "corporate",
	// "synthwave",
	// "retro",
	// "cyberpunk",
	// "valentine",
	// "halloween",
	// "garden",
	// "forest",
	// "aqua",
	// "lofi",
	// "pastel",
	// "fantasy",
	// "wireframe",
	// "black",
	// "luxury",
	// "dracula",
	// "cmyk",
	// "autumn",
	// "acid",
	// "lemonade",
	// "night",
	// "coffee",
	// "winter",
	// "dim",
	// "nord",
	// "sunset",
];

export const defaultTheme = themes[0];
