<script lang="ts">
  import { signInWithEmailAndPassword, type User } from "firebase/auth";
  import { auth, user } from '$lib/firebase';
  import { currentPage } from '$lib/store';
  import { goto } from "$app/navigation";

  // Set the current page
  currentPage.set('login');

  let email = '';
  let password = '';
  let errorMessage = '';

	async function handleLogin() {
    errorMessage = ''; // Reset the error message on each submission attempt

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User is signed in, redirect to home or dashboard page
      console.log('User logged in: ', $user);

    } catch (error:any) {
      // Error occurred during sign in
      errorMessage = error.message;
    }
  }
</script>

<div class="flex flex-grow items-center justify-center text-white">
  {#if $user}
    {#await goto("/")}{/await}
  {:else}
	<div class="max-w-md w-full bg-base-200 p-6 rounded-xl shadow-lg">
    <h2 class="text-center text-3xl font-bold mb-4">Log In to Lyricalia</h2>
    <form on:submit|preventDefault={handleLogin}>
      {#if errorMessage}
        <div class="alert alert-error mb-4">
          {errorMessage}
        </div>
      {/if}
      <div class="mb-4">
        <label for="email" class="sr-only">Email</label>
        <input 
          bind:value={email} 
          id="email" 
          type="email" 
          class="input input-bordered w-full" 
          placeholder="Email address" 
          required
        >
      </div>
      <div class="mb-4">
        <label for="password" class="sr-only">Password</label>
        <input 
          bind:value={password} 
          id="password" 
          type="password" 
          class="input input-bordered w-full" 
          placeholder="Password" 
          required
        >
      </div>
      <div>
	      <button type="submit" class="btn btn-primary w-full" disabled={!email || !password}>Log In</button>
      </div>
      <div class="flex justify-between mt-4 text-sm">
        <a href="/register" class="underline">Register</a>
        <a href="/forgot-password" class="underline">Forgot Password?</a>
      </div>
    </form>
  </div>
  {/if}
</div>
