import { createClient } from 'pexels'

const client = createClient(process.env.EXPO_PUBLIC_PEXELS_API_KEY as string);
async function fetchPhoto(keyword: string) {
    const query = await client.photos.search({ query: keyword, per_page: 1 });
    return query
}

export default fetchPhoto;