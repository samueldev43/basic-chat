export function fetchReq(method, url, data = null) {

    function ifError(response) {
        if(!response.ok) {
            throw Error(response.status + response.statusText)
        }
        return response
    }

   return fetch(url, {
        method,
        body: data,
        headers: {
            'Content-Type': 'application/json;charseti=UTF-8'
        }
    })
    .then(response => ifError(response))
    .then(response => response.json())
}