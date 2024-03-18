export const rehypePrettyCodeOptions = {
	theme: "one-dark-pro",
	keepBackground: false,
	tokensMap: {
		fn: "entity.name.function",
	},
	onVisitLine(node) {
		// Prevent lines from collapsing in `display: grid` mode, and
		// allow empty lines to be copy/pasted
		if (node.children.length === 0) {
			node.children = [
				{
					type: "text",
					value: " ",
				},
			];
		}
	},
	onVisitHighlightedLine(node) {
		// Each line node by default has `class="line"`.
		node.properties.className.push("line--highlighted");
	},
	onVisitHighlightedWord(node, id) {
		node.properties.className = ["word--highlighted"];
		// `id` will be either 'v', 's', or 'i'.
		// State (v)alue, (s)etter, and (i)nitial value
		if (id) {
			const backgroundColor = {
				red: "rgba(255, 0, 0, 0.25)",
				coral: "rgba(255, 127, 80, 0.35)",
				orange: "rgba(255, 165, 0, 0.25)",
				yellow: "rgba(255, 255, 0, 0.25)",
				violet: "rgba(238, 130, 238, 0.25)",
				teal: "rgba(0, 128, 128, 0.25)",
				lime: "rgba(0, 255, 0, 0.35)",
				cyan: "rgba(0, 255, 255, 0.25)",
				hotpink: "rgba(255, 105, 180, 0.35)",
			}[id];
			const color = {
				red: "rgba(255, 0, 0, 1)",
				coral: "rgba(255, 127, 80, 1)",
				orange: "rgba(255, 165, 0, 1)",
				yellow: "rgba(255, 255, 0, 1)",
				violet: "rgba(238, 130, 238, 1)",
				teal: "rgba(0, 128, 128, 1)",
				lime: "rgba(0, 255, 0, 1)",
				cyan: "rgba(0, 255, 255, 1)",
				hotpink: "rgba(255, 105, 180, 1)",
			}[id];

			// If the word spans across syntax boundaries (e.g. punctuation), remove
			// colors from the child nodes.
			if (node.properties["data-rehype-pretty-code-wrapper"]) {
				node.children.forEach((childNode) => {
					childNode.properties.style = "";
				});
			}
			node.properties.style = `background-color: ${backgroundColor}; color: ${color}; padding: 2px; border-radius: calc(var(--radius) - 4px);`;
		}
	},
};
