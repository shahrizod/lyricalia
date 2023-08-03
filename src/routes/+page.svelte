<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { slide, fly } from 'svelte/transition';
  import testData from '../testData.json';
  import { json } from '@sveltejs/kit';
	let isSearchMade = false;
	let search: string = '';
	let songs = [] as any

	const dispatch = createEventDispatcher();

	let getFakeData = async() => {
		songs = testData
	}

	let getData = async(searchTerm:string) => {
		const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${searchTerm}&per_page=10&page=1`;
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'fdc40f4ebdmsh6e065fd66fb4ff9p116441jsnd0cae15490c7',
				'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
			}
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			songs = result.hits;
			console.log(songs);
		} catch (error) {
			console.error(error);
		}

	}

	const searchLyrics = (lyrics:string) => {
		isSearchMade = true;
		dispatch('searchmade');
		// getData(lyrics);
		getFakeData();
		(document.activeElement as HTMLInputElement | null)?.blur();
	}
</script>

<style>

  .bg-img {
    background: url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') no-repeat center center/cover;
	}
</style>

<main class="min-h-screen text-white flex flex-col bg-img">

	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl">Home</a>
		</div>
		<div class="flex-none">
			<a class="btn btn-primary">Log In</a>
			<a class="btn btn-primary mx-3">Register</a>
		</div>
	</div> 
  
  <div class="flex flex-col items-center {isSearchMade ? 'mt-8' : 'mt-32'} transition-spacing duration-300">
		<div class="text-center">
			<h1 class="text-7xl font-bold">Lyricalia</h1>
			<p class="py-6">Use lyrics to find and save all your favorite songs</p>
		</div>
    <div class="w-full max-w-lg relative mt-2 flex flex-row">
      <input 
        bind:value={search} 
        class="w-full py-3 px-4 pr-10 mr-2 rounded-lg bg-gray-800 text-gray-100 leading-tight focus:outline-none" 
        placeholder="Search lyrics..." 
        on:keydown={e => e.key === 'Enter' && searchLyrics(search)}
      >
      <button 
        class="btn btn-primary" 
        on:click={() => searchLyrics(search)}
      >
				Submit
      </button>
    </div>	
  </div>

	<div class="overflow-auto mx-48 mt-8" style="max-height: 59vh">
    {#each songs as song, i (song)}
      <div class="card card-side justify-center bg-base-100 shadow-xl m-2" transition:slide="{{delay: 500 + i * 50, duration: 300}}">
        <figure class="w-20 m-2 pl-2"> <img src={song.result.header_image_url} alt="Album Cover"/> </figure>
        <div class="card-body">
          <h2 class="card-title">{song.result.title}</h2>
          <p>{song.result.artist_names}</p>
        </div>
        <div class="mr-4 flex items-center">
          <button class="btn btn-primary">+</button>
        </div>
      </div>
    {/each}			
  </div>
</main>


<!-- <script lang="ts">
  let count = 0;
  $: if (count>5) {
    count = 0;
    alert('too high, back down you go');
  }

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	let selected = colors[0];
  let songs = [] as any

	let getData = async(searchTerm:string) => {
		const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${searchTerm}&per_page=10&page=1`;
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'fdc40f4ebdmsh6e065fd66fb4ff9p116441jsnd0cae15490c7',
				'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
			}
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			songs = result.hits;
		} catch (error) {
			console.error(error);
		}

	}

	let handleSearch = () => {
		let value = (document.getElementById("lyric-input") as HTMLInputElement | null)?.value;
		if (value == undefined) return;
		getData(value);
		console.log(songs);
	}

</script>

<!-- <div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl">Home</a>
	</div>
	<div class="flex-none">
		<a class="btn btn-primary">Log In</a>
		<a class="btn btn-primary mx-3">Register</a>
	</div>
</div> -->

<!-- <div class="hero min-h-screen bg-base-200" style="background-image: url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80);">
	<div class="hero-overlay bg-opacity-40"></div>
	
	<div class="hero-content flex-col">
		<div class="text-center">
			<h1 class="text-7xl font-bold">Lyricalia</h1>
			<p class="py-6">Use lyrics to find and save all your favorite songs</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<div class="form-control">
					<label class="label" for="lyric-input">
						<span class="label-text">Enter lyric to search for</span>
					</label>
					<input type="text" placeholder="Search Lyrics..." class="input input-bordered" id="lyric-input"/>
				</div>
				<div class="form-control mt-6">
					<button class="btn btn-outline btn-success" on:click={handleSearch}>Submit</button>
				</div>
			</div>
		</div>


		<div class="overflow-auto max-h-72">
			{#each songs as song}
				<div class="card card-side bg-base-100 shadow-xl m-3">
					<figure class="w-20 m-2 pl-2"> <img src={song.result.header_image_url} alt="Album Cover"/> </figure>
					<div class="card-body">
						<h2 class="card-title">{song.result.title}</h2>
						<p>{song.result.artist_names}</p>
					</div>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">+</button>
					</div>
				</div>
			{/each}			
		</div>

	</div>
</div> -->

<!-- <div class="items-center text-center" style="width:100%">
  <h1 class="text-2xl">The current count is {count}</h1>
  <div class="btn-group">
    <button class="btn btn-primary" on:click={()=>count++}>Up</button>
    <button class="btn btn-secondary" on:click={()=>count--}>Down</button>
  </div>  
  <div>
    <p>Test</p>
  </div>
</div> -->


<!-- A # character always indicates a block opening tag. 
     A / character always indicates a block closing tag. 
     A : character, as in {:else}, indicates a block continuation tag. Don't worry — you've already learned almost all the syntax Svelte adds to HTML.
-->

<!-- {#if count == 0 }
  <p>{count} is 0</p>
{:else if count < 0}
	<p>{count} is less than 0</p>
{:else}
  <p>{count} is greater than 0</p>
{/if}

<h1 style="color: {selected}">Pick a colour</h1>

<div>
	{#each colors as color, i}
		<button
			aria-current={selected === color}
			aria-label={color}
			style="background: {color}"
			on:click={() => selected = color}
		>{i+1}</button>
	{/each}
</div>

<h1 class="text-5xl font-bold underline">
  Hello world!
</h1> -->

<!-- <style lang="postcss">
	h1 {
		transition: color 0.2s;
	}

	div {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 5px;
		max-width: 400px;
	}

	button {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: translate(-2px,-2px);
		filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
		transition: all 0.1s;
	}

	button[aria-current="true"] {
		transform: none;
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
	}
</style> -->