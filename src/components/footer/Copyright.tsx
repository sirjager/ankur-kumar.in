import {site} from "@/lib/constants";
import {component$, useSignal, useTask$} from "@builder.io/qwik";

export default component$(() => {
	const date = useSignal(new Date());
	useTask$(() => {
		date.value = new Date();
	});

	return (
		<div class="p-2 font-bold">
			&copy; {date.value.getFullYear()} {site.title}
		</div>
	);
});
