async function getAuthToken() {
    const fetch = (await import('node-fetch')).default;

    const response = await fetch('https://dev-7txjr4h7f68rlivl.us.auth0.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: 'Op70SJ5Iz3LK6f0wu1vfuqkcL9Fa6fyk',
            client_secret: '7EhHrqMukJIlHhg_ksnaOsu6u2dOSyVptAiOCbmU8yuCY6iH5SDguSw1IBABWhGo',
            audience: 'https://book-store-api',
            grant_type: 'client_credentials'
        })
    });

    const data = await response.json();//In the getAuthToken.js code, the reason it returns a promise is that it uses the request-promise library. This library is built on top of the standard request library and automatically wraps the HTTP request in a promise.The request function from the request-promise library returns a promise. This means that when you call request(options), it does not return the actual response immediately. Instead, it returns a promise that will eventually be resolved with the response data once the HTTP request completes.The 'await' means that the function pauses execution until the promise returned by request(options) is resolved. Once the response has a value (options) then it will continue with the code below which put the 'response' into the variable access_token which in the routes will be add it as a token.
    return data.access_token;
}

//export default getAuthToken;
module.exports = getAuthToken;


