<script lang="ts">
  import { user } from "$lib/firebase";
</script>

{#if $user}
<slot />
{:else}
  <div class="bg-base-200 p-6 rounded-xl shadow-lg">
    <p class="text-error">
        You must be signed in to view this page.
        <a class="btn btn-primary" href="/login">Sign in</a>
    </p>
  </div>
{/if}