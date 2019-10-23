<script>
    import { crossfade, scale } from "svelte/transition";
	import images from '../home/images.js';
	import Pagination from './pagination.svelte'

	const [send, receive] = crossfade({
		duration: 200,
		fallback: scale
	});

	let selected = null;
	let loading = null;

	const ASSETS = `https://sveltejs.github.io/assets/crossfade`;

	const load = image => {
		const timeout = setTimeout(() => loading = image, 100);

		const img = new Image();

		img.onload = () => {
			selected = image;
			clearTimeout(timeout);
			loading = null;
		};

        img.src = image.src;

	};


</script>



<style>

	.container {
		background-color: whitesmoke;
		border-radius: 1em;
	}
    h1 {
        color:black
    }

    .grid {
		display: grid;
		flex: 1;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(4, 1fr);
		grid-gap: 2vmin;
	}
    button {
		width: 100%;
		height: 100%;
		color: white;
		font-size: 5vmin;
		border: none;
		margin: 0;
		will-change: transform;
	}
    .photo, img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.square {
		border-radius: 2em;
	}

	.photo {
		display: flex;
		align-items: stretch;
		justify-content: flex-end;
		flex-direction: column;
		will-change: transform;
	}

	img {
		object-fit: contain;
		cursor: pointer;
	}
</style>

<div class="container">
	<div class="notification">
			<div>
				<div class="grid">
					{#each images as image}
						<div class="square">
							{#if selected !== image}
								<button
									class="square"
									style="background-color: {image.color};"
									on:click="{() => load(image)}"
									in:receive={{key:image.id}}
									out:send={{key:image.id}}
								>{loading === image ? '...' : image.name}</button>
							{/if}
						</div>
					{/each}
				</div>
		
				{#if selected}
					{#await selected then d}
						<div class="photo" in:receive={{key:d.id}} out:send={{key:d.id}}>
							<img
								alt={d.alt}
								src={d.src}
								on:click="{() => selected = null}"
							>
		
							<p class='credit'>
								<a target="_blank" href="https://www.flickr.com/photos/{d.path}">via Flickr</a> &ndash;
								<a target="_blank" href={d.license.url}>{d.license.name}</a>
							</p>
						</div>
					{/await}
				{/if}
			</div>
	</div>
  	<hr>

	<Pagination/>
</div>
