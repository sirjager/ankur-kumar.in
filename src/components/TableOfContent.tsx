import type {Heading} from "@/lib/markdoc";
import {component$, useStore} from "@builder.io/qwik";

interface Props {
	headings: Heading[];
	opened?: boolean;
}

export default component$<Props>(({opened = true, headings}) => {
	const state = useStore({opened});

	return (
		<div id="toc" class="group/toc relative text-sm">
			<div class="relative flex items-center justify-center gap-6 py-1 lg:justify-center lg:py-2">
				<div
					aria-hidden="true"
					class="absolute bottom-0 h-1.5 w-full transition duration-300 ease-in-out"
				></div>
				<p class="font-bold uppercase group-hover/toc:text-accent">Table of Contents</p>

				<button
					onClick$={() => (state.opened = !state.opened)}
					class={[
						"group/tgthm border border-neutral/20 transition-all duration-300 ease-in-out dark:border-neutral-content/40",
						"btn-square btn-sm relative grid place-items-center overflow-clip rounded-btn p-0",
						"after:transition-all after:duration-300 after:ease-in-out",
						"after:absolute after:h-full after:w-full after:rounded-btn after:bg-base-content after:content-['']",
						"after:-bottom-full hover:after:bottom-0",
					]}
				>
					<span class="z-[1]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							class={[
								"h-5 w-5 -rotate-90 stroke-base-content group-hover/tgthm:stroke-base-200",
								"transition duration-300 ease-in-out",
								{
									"rotate-0": state.opened,
								},
							]}
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M15 11l-3 3l-3 -3"></path>
							<path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
						</svg>
					</span>
				</button>
			</div>

			<ul
				id="toc-list"
				class={[
					"h-full max-h-80 overflow-x-hidden px-1 py-4 lg:overflow-y-auto",
					"transition-all duration-300 ease-in-out",
					{
						"h-0": !state.opened,
					},
				]}
			>
				{headings.map((heading) => {
					return (
						<li
							key={heading.slug}
							id={`tocli-${heading.slug}`}
							class={[
								"group/hblock tocli relative flex flex-col justify-center border-l border-base-300 py-0.5 text-xs xl:text-sm",
								{
									hidden: !state.opened,
								},
							]}
						>
							<div
								aria-hidden="true"
								class="absolute -ml-1 h-2 w-2 rounded-btn bg-base-content/10 group-hover/hblock:bg-accent"
							/>
							<a
								href={`#${heading.slug}`}
								class={[
									"group/htext text-muted-foreground hover:text-foreground relative mx-3 mr-2 block rounded-md p-1",
									{
										"pl-2": heading.depth === 2,
										"pl-4": heading.depth === 3,
										"pl-6": heading.depth === 4,
										"pl-8": heading.depth === 5,
										"pl-10": heading.depth === 6,
									},
								]}
							>
								<div
									aria-hidden="true"
									class={[
										"group-hover/htext:text-foreground absolute bottom-0 h-0.5 w-0 group-hover/htext:w-11/12",
									]}
								/>
								{heading.text}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
});
