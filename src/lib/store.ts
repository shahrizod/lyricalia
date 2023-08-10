import { writable } from 'svelte/store';

// Store for holding current page
export const currentPage = writable('home');