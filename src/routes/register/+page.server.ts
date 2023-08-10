import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { auth, user } from '$lib/firebase';

export const load = (async () => {
    // if (user) {
    //     throw redirect(307, '/');
    // }
}) satisfies PageServerLoad;