export const fetch = (request, env) => {
    return new Response("hello - world!", {
        headers: { 'Content-Type': 'text/html' }
    });
}