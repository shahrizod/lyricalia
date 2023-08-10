import type { PageServerLoad, Actions } from './$types';
import { GENIUS_API_KEY } from '$env/static/private';

let getData = async(searchTerm:any) => {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${searchTerm}&per_page=10&page=1`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': GENIUS_API_KEY,
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const songs = result.hits;
        return songs;
    } catch (error) {
        console.error(error);
        return null;
    }

}

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async({request, params}) => {
        const data = await request.formData();
        console.log(data.get('searchTerm'));
        const songs = await getData(data.get('searchTerm'));
        console.log({songs});
    }
}