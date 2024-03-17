type color =
	| "red"
	| "coral"
	| "orange"
	| "yellow"
	| "violet"
	| "teal"
	| "lime"
	| "cyan"
	| "lavender"
	| "peach"
	| "mint"
	| "babyblue"
	| "lemon"
	| "periwinkle"
	| "blush"
	| "seafoam"
	| "rose"
	| "apricot"
	| "skyblue"
	| "lilac";

const colors: Record<color, {bg: string; fg: string}> = {
	red: {bg: "rgba(255, 0, 0, 0.25)", fg: "rgba(255, 0, 0, 1)"},
	coral: {bg: "rgba(255, 127, 80, 0.35)", fg: "rgba(255, 127, 80, 1)"},
	orange: {bg: "rgba(255, 165, 0, 0.25)", fg: "rgba(255, 165, 0, 1)"},
	yellow: {bg: "rgba(255, 255, 0, 0.25)", fg: "rgba(255, 127, 80, 1)"},
	violet: {bg: "rgba(238, 130, 238, 0.25)", fg: "rgba(238, 130, 238, 1)"},
	teal: {bg: "rgba(0, 128, 128, 0.25)", fg: "rgba(0, 128, 128, 1)"},
	lime: {bg: "rgba(0, 255, 0, 0.07)", fg: "rgba(0, 128, 128, 1)"},
	cyan: {bg: "rgba(0, 255, 255, 0.15)", fg: "rgb(19, 176, 228)"},

	lavender: {bg: "rgba(230, 230, 250, 0.45)", fg: "rgb(112, 94, 172)"},
	peach: {bg: "rgba(255, 218, 185, 0.25)", fg: "rgba(255, 105, 180, 1)"},
	mint: {bg: "rgba(189, 252, 201, 0.25)", fg: "rgba(0, 128, 128, 1)"},
	babyblue: {bg: "rgba(173, 216, 230, 0.25)", fg: "rgb(19, 176, 228)"},
	lemon: {bg: "rgba(255, 250, 205, 0.45)", fg: "rgba(255, 165, 0, 1)"},
	periwinkle: {bg: "rgba(204, 204, 255, 0.25)", fg: "rgb(144, 144, 235)"},
	blush: {bg: "rgba(222, 93, 131, 0.25)", fg: "rgba(222, 93, 131, 1)"},
	seafoam: {bg: "rgba(120, 222, 176, 0.25)", fg: "rgba(120, 222, 176, 1)"},
	rose: {bg: "rgba(255, 102, 204, 0.25)", fg: "rgba(255, 102, 204, 1)"},
	apricot: {bg: "rgba(251, 206, 177, 0.25)", fg: "rgb(210, 153, 115)"},
	skyblue: {bg: "rgba(135, 206, 235, 0.25)", fg: "rgb(68, 153, 187)"},
	lilac: {bg: "rgba(200, 162, 200, 0.25)", fg: "rgba(200, 162, 200, 1)"},
};

export interface Color {
	name: color;
	bg: string;
	fg: string;
}

export function getColors(_color?: color): Color {
	if (_color) {
		return {name: _color, ...colors[_color]};
	}
	const colorKeys = Object.keys(colors);
	const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)] as color;
	return {name: randomColorKey, ...colors[randomColorKey]};
}
