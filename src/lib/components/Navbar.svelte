<script lang="ts">
  import { onAuthStateChanged } from 'firebase/auth';
  import { onMount } from 'svelte';
  import { auth, userData } from '$lib/firebase';
  import { currentPage } from '$lib/store'
  import { goto } from '$app/navigation';

  function handleLogout() {
    auth.signOut().then(() => {
      console.log('User logged out');
    }).catch((error) => {
      console.error('Error logging out: ', error);
    });
  }
</script>

<nav class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/">Lyricalia</a>
  </div>
  <div class="flex-none">
    {#if $userData}
      <div class="avatar placeholder">
          <a href="/profile" class="btn rounded-full w-12 mr-4">{$userData?.username[0] ?? "me"}</a>
        <!-- <div class="mb-8 w-24 h-24 mask mask-squircle">
          <img src={$user.photoURL} alt="Avatar">
        </div> -->
      </div>
      <button class="btn btn-primary" on:click={handleLogout}>Log Out</button>
    {:else}
      {#if $currentPage === 'login'}
        <a href="/register" class="btn btn-primary mx-3">Register</a>
      {:else if $currentPage === 'register'}
        <a href="/login" class="btn btn-primary">Log In</a>
      {:else}
        <a href="/login" class="btn btn-primary">Log In</a>
        <a href="/register" class="btn btn-primary mx-3">Register</a>
      {/if}
    {/if}
  </div>
</nav>
