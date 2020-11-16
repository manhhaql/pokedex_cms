import axios from 'axios';
import appConfigs from 'config';

class HTTPRequest {
    constructor() { };

    static get({ baseUrl = appConfigs.API.ROOT_URL, url, token, params }) {
        return axios({
            timeout: appConfigs.REQUEST.TIMEOUT,
            method: 'get',
            baseURL: baseUrl,
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token || ''
            },
            params: params
        });
    };
    static post({ baseUrl = appConfigs.API.ROOT_URL, url, token, data }) {
        return axios({
            timeout: appConfigs.REQUEST.TIMEOUT,
            method: 'post',
            baseURL: baseUrl,
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token || ''
            },
            data: data
        });
    };
    static put({ baseUrl = appConfigs.API.ROOT_URL, url, token, data }) {
        return axios({
            timeout: appConfigs.REQUEST.TIMEOUT,
            method: 'put',
            baseURL: baseUrl,
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token || ''
            },
            data: data
        });
    };
    static delete({ baseUrl = appConfigs.API.ROOT_URL, url, token, params }) {
        return axios({
            timeout: appConfigs.REQUEST.TIMEOUT,
            method: 'delete',
            baseURL: baseUrl,
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token || ''
            },
            params: params
        });
    };
    static upload({ baseUrl = appConfigs.API.ROOT_URL, url, token, data, files }) {

        var formData = new FormData();
        if (data) {
            for (let field in data) {
                formData.set(field, data[field]);
            }
        }

        if (files) {
            for (let field in files) {
                formData.append(field, files[field], files[field].name);
            }
        }

        return axios({
            timeout: appConfigs.REQUEST.TIMEOUT,
            method: 'post',
            baseURL: baseUrl,
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token || ''
            },
            data: formData
        });
    };
};

export default HTTPRequest;