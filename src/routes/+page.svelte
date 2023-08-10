<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { slide, fly } from 'svelte/transition';
  import testData from '../testData.json';
	import { currentPage } from '$lib/store';
	import { user, db, userData } from '$lib/firebase';
	import {
      arrayRemove,
      arrayUnion,
      doc,
      setDoc,
      updateDoc,
  } from "firebase/firestore";

	currentPage.set('home');

	let isSearchMade = false;
	let search: string = '';
	let songs = [] as any
	
	// const dispatch = createEventDispatcher();

	// let getFakeData = async() => {
	// 	songs = testData
	// }

	const searchLyrics = (lyrics:string) => {
		isSearchMade = true;
		// dispatch('searchmade');
		(document.activeElement as HTMLInputElement | null)?.blur();
	}

	async function addSong(song: any) {
		const userRef = doc(db, "users", $user!.uid);

		await updateDoc(userRef, {
			songs: arrayUnion({
				title: song.title,
				artist_names: song.artist_names,
				header_image_url: song.header_image_url,
				url: song.url,
			}),
		});
  }

	let formLoading = false;
	export let form;
	// export let data: PageData;
</script>

  <div class="flex flex-col items-center {isSearchMade ? 'mt-8' : 'mt-32'} transition-spacing duration-300">
		<div class="text-center">
			<h1 class="text-7xl font-bold">Lyricalia</h1>
			<p class="py-6">Use lyrics to find and save all your favorite songs</p>
		</div>
		<form method="POST" use:enhance={() => {
			formLoading = true;
			return async ({ update }) => {
					formLoading = false;
					update();
			};
		}}
			class="w-full max-w-lg relative mt-2 flex flex-row">
			<input 
				name="searchTerm"
				bind:value={search} 
				class="w-full py-3 px-4 pr-10 mr-2 rounded-lg bg-gray-800 text-gray-100 leading-tight focus:outline-none" 
				placeholder="Search lyrics..." 
				on:keydown={e => e.key === 'Enter' && SubmitEvent}
			>
			<button 
			class="btn btn-primary" 
			on:click={() => searchLyrics(search)}
			>
				Submit
			</button>
		</form>
	</div>	

<div class="overflow-auto mx-48 mt-8" style="max-height: 59vh">
	{#if form?.songs && !formLoading}
			{#each form.songs as song, i (song)}
				<div class="card card-side justify-center bg-base-100 shadow-xl m-2" in:slide={{delay: 300 + i * 50, duration: 300}}>
					<figure class="w-20 m-2 pl-2"> <img src={song.result.header_image_url} alt="Album Cover"/> </figure>
					<div class="card-body">
						<h2 class="card-title">{song.result.title}</h2>
						<p>{song.result.artist_names}</p>
					</div>
					{#if $user && !$userData?.songs.some(({ url }) => url === song.result.url)}
						<div class="mr-4 flex items-center">
							<button class="btn btn-primary" on:click={() => addSong(song.result)}>+</button>
						</div>
					{/if}
				</div>
			{/each}			
	{:else if formLoading}
		<div class="flex justify-center">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{/if}
</div>

