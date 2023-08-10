<script lang="ts">
    import type { PageData } from './$types';
    import AuthCheck from '$lib/components/AuthCheck.svelte';
    import {user, db, userData} from '$lib/firebase';
    import { slide } from 'svelte/transition';
    // export let data: PageData;
    import {
      arrayRemove,
      arrayUnion,
      doc,
      setDoc,
      updateDoc,
    } from "firebase/firestore";

    async function removeSong(item: any) {
      const userRef = doc(db, "users", $user!.uid);
      await updateDoc(userRef, {
        songs: arrayRemove(item),
      });
    }

</script>

<div class="flex flex-grow items-center justify-center text-white ">
    <AuthCheck>
        <div class="w-full max-w-7xl bg-base-200 p-6 rounded-xl shadow-lg">
            <p class="text-4xl text-center">{$userData?.username}'s songs</p>
            <div class="overflow-auto mt-8" style="max-height: 70vh">
                {#if $userData?.songs}
                {#each $userData.songs as song, i (song)}
                    <div class="card card-side justify-center bg-base-100 shadow-xl m-2" in:slide={{delay: 300 + i * 50, duration: 300}}>
                        <figure class="w-20 m-2 pl-2"> <img src={song.header_image_url} alt="Album Cover"/> </figure>
                        <div class="card-body">
                            <a class="card-title link link-hover" href={song.url} target="_blank">{song.title}</a>
                            <p>{song.artist_names}</p>
                        </div>
                        <div class="mr-4 flex items-center">
                            <button class="btn btn-primary" on:click={() => removeSong(song)}>-</button>
                        </div>
                    </div>
                {/each}		
                {/if}	
            </div>
        </div>
    </AuthCheck>
</div>