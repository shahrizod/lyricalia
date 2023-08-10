<script>
  import "$lib/global.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import { user, userData } from '$lib/firebase';

  $user;
  $userData;
</script>

<style>

  .bg-img {
    background: url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') no-repeat center center/cover;
	}
</style>

<main class="min-h-screen text-white flex flex-col bg-img">
  <Navbar />
  <slot />
</main>