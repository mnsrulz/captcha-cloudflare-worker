import { generateM3u8 } from "./utils";

export default {
    fetch: async () => {
        const data = generateM3u8();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}