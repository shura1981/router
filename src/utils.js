function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
export const Http = ({ url, method = 'GET', data = null, headers = null }) => {
    return new Promise(async (resolve, reject) => {
        fetch(url, {
            method: method,
            headers: headers ?? {
                'Content-Type': 'application/json'
            },
            body: method === 'GET' ? null : JSON.stringify(data)
        }).then(async res => {
            if (!res.ok) {
                const response = await res.text();
                if (!isJsonString(response)) throw new Error(JSON.stringify({ statusText: response, status: res.status }));
                const message = JSON.parse(response)?.message ?? res.statusText;
                throw new Error(JSON.stringify({ statusText: message, status: res.status }));
            }
            return res.json()
        }
        ).then(res => {
            resolve(res)
        }
        ).catch(err => {
            reject(JSON.parse(err.message));
        })
    })
}
