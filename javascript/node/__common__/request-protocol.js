import axios from 'axios';


export function JsonRpc(url, headerArgs) {
    headerArgs = headerArgs ?? {};
    const axiosInstance = axios.create({
        baseURL: url,
        method: 'post',
        headers: {
            Accept: 'application/json',
            ['Content-Type']: 'application/json',
            ...headerArgs,
        }
    })

    return async function(method, params, id) {
        id = id ?? 1;
        params = params ?? [];
        const res =  await axiosInstance.request({
            data: {
                jsonrpc:'2.0',
                method,
                params,
                id,
            }
        })
        return res.data;
    }
}
