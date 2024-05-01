<script>
	import {writable} from "svelte/store";
	export let slug;
	const views = writable(0);
	const fetchViews = (async () => {
		try {
			const res = await fetch(`/api/views?path=${slug}`);
			const data = await res.json();
			animateViews(data.views);
			return data;
		} catch (_) {}
	})();

	const animateViews = (targetViews) => {
		let currentViews = 0;
		// Incrementally update views count until it reaches the target
		const interval = setInterval(() => {
			currentViews += 1; // Increment by 1
			views.set(currentViews); // Update the views count
			// Stop the animation when target views count is reached
			if (currentViews >= targetViews) {
				clearInterval(interval);
			}
		}, 0.1); 
	};
</script>

<div class="shadow p-2 rounded-badge flex items-center gap-2">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-5 w-5 fill-base-content/80">
		<path
			d="M572.5 241.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 143.9 143.9 0 0 1 -144 144zm0-240a95.3 95.3 0 0 0 -25.3 3.8 47.9 47.9 0 0 1 -66.9 66.9A95.8 95.8 0 1 0 288 160z"
		/></svg
	>

	{#await fetchViews}
		<span class="loading loading-ring"></span>
	{:then}
		<div>
			<span class="transition">{$views}</span> Views
		</div>
	{:catch}
		<div>error</div>
	{/await}
</div>
