import {themeMode, themes} from "@/lib/themes";
import {$, component$} from "@builder.io/qwik";

export default component$(() => {
	const switchTheme = $(() => {
		// @ts-ignore : already initialized in Head.astro
		if (typeof window._applyTheme !== "function") return;
		const theme = document.documentElement.getAttribute("data-theme");
		if (!theme) {
			const _stored = localStorage.getItem("theme");
			// @ts-ignore
			if (_stored) window._applyTheme(_stored.split("@"));
			// @ts-ignore
			else window._applyTheme(themes[0], themeMode(themes[0]));
		} else {
			const index = themes.indexOf(theme);
			// @ts-ignore
			if (index === -1) window._applyTheme(themes[0], themeMode(themes[0]));
			else {
				const _selected = themes[(index + 1) % themes.length];
				// @ts-ignore
				window._applyTheme(_selected, themeMode(_selected));
			}
		}
	});

	return (
		<button
			aria-label="switch themes"
			onClick$={switchTheme}
			class={[
				"btn-square",
				"transition-all duration-300 ease-in-out",
				"group/tgthm border-base-300",
				"relative grid place-items-center overflow-clip rounded-btn p-0",
				"after:transition-all after:duration-300 after:ease-in-out",
				"after:absolute after:h-full after:w-full after:rounded-btn after:bg-base-content after:content-['']",
				"after:-bottom-full hover:after:bottom-0",
				"outline-none ring-offset-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-black",
			]}
		>
			<span class="z-[1]">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					class={[
						"transition duration-300 ease-in-out",
						"h-5 w-5 fill-base-content group-hover/tgthm:fill-base-200",
					]}
				>
					<path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
				</svg>
			</span>
		</button>
	);
});
