import { data } from './../data/out-data.js';
export default {
    fetch: async () => {
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}