<script lang="ts">
  import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
  import { db, auth, user } from '$lib/firebase';
	import { doc, getDoc, writeBatch} from "firebase/firestore";
  import { currentPage } from '$lib/store';
  import { goto } from "$app/navigation";
  import { error } from "@sveltejs/kit";

	currentPage.set('register');

  let email = '';
  let password = '';
  let errorMessage = '';

  let username = '';
	let isAvailable = false;
	let debounceTimer: NodeJS.Timeout;
	let loading = false;
	
	const reUser = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  
	$: isValid = username?.length > 2 && username.length < 16 && reUser.test(username);
	$: isTouched = username.length > 0;
	$: isTaken = isValid && !isAvailable && !loading
	$: canRegister = isValid && !isTaken && !loading && email && password
	
	async function checkAvailability() {
		if(!isTouched || !isValid) return;
    isAvailable = false;
    clearTimeout(debounceTimer);

    loading = true;

    debounceTimer = setTimeout(async () => {
        console.log("checking availability of", username);
        const ref = doc(db, `usernames`, username);
        const exists = await getDoc(ref).then((doc) => doc.exists());

        isAvailable = !exists;
        loading = false;

    }, 500);

  }


  async function confirmUsername() {
    console.log("confirming username", username);
    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), { uid: $user?.uid });
    batch.set(doc(db, "users", $user!.uid), { 
      username, 
			songs: []
    });

    await batch.commit();

    username = '';
    isAvailable = false;

  }

  async function handleRegister() {
    errorMessage = ''; // Reset the error message on each submission attempt

		if (!isAvailable) {
			errorMessage = 'Username is unavailable';
			return;
		}

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User is registered and signed in, redirect to home or dashboard page
      console.log('User registered and logged in: ', user);
			await confirmUsername();
    } catch (error:any) {
      // Error occurred during registration
      errorMessage = error.message;
    }
  }
</script>

<div class="flex flex-grow items-center justify-center text-white">
	<div class="max-w-md w-full bg-base-200 p-6 rounded-xl shadow-lg">
		{#if $user}
			{goto("/")}
		{:else}
			<h2 class="text-center text-3xl font-bold mb-4">Register for Lyricalia</h2>
			<form on:submit|preventDefault={handleRegister}>
				{#if errorMessage}
					<div class="alert alert-error mb-4">
						{errorMessage}
					</div>
				{/if}
				<div class="mb-4">
					<label for="username" class="sr-only">Username</label>
					<input 
						bind:value={username} 
						id="displayName" 
						type="text" 
						class="input input-bordered w-full"
						class:input-error={(!isValid && isTouched)}
						class:input-warning={isTaken}
						class:input-success={isAvailable && isValid && !loading}
						placeholder="Username"
						on:input={checkAvailability} 
						required
					/>
					<label for="username_err" class="label">
						{#if loading && isTouched}
							<span class="loading loading-dots loading-xs"></span>
						{/if}
				
						{#if !isValid && isTouched}
							<p class="text-error text-sm">
								Must be 3-16 characters long and alphanumeric only
							</p>
						{/if}
				
						{#if isValid && !isAvailable && !loading}
							<p class="text-warning text-sm">
								@{username} is not available
							</p>
						{/if}
					</label>				
				</div>

				<div class="mb-4">
					<label for="email" class="sr-only">Email</label>
					<input 
						bind:value={email} 
						id="email" 
						type="email" 
						class="input input-bordered w-full" 
						placeholder="Email address" 
						required
					/>
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
					/>
				</div>
				<div>
					<button type="submit" class="btn btn-primary w-full" disabled={!canRegister}>Register</button>
				</div>
				<div class="flex justify-between mt-4 text-sm">
					<a href="/login" class="underline">Log In</a>
				</div>
			</form>
		{/if}
	</div>
</div>