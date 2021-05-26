import axios from 'axios';
import logger from 'helpers/Logger';

axios.interceptors.request.use((req) => {
    logger.info({ req });
    return req;
});

axios.interceptors.response.use((res, req) => {
    logger.info({ res, data: res.data, req });
    return res;
});

class Api {
    constructor(config) {
        const { baseURL, timeout, authorization, username, password } = config ?? {};

        this.baseURL = baseURL;
        this.timeout = timeout;
        this.auth = {};
        this.authHeaders = {};

        if (authorization) {
            this.authHeaders = {
                Authorization: authorization,
            };
        }

        if (username && password) {
            this.auth = { username, password };
        }
    }

    resolveURL(path) {
        const baseURL = this.baseURL;
        if (baseURL) {
            const normalizedBaseURL = baseURL.endsWith('/') ? baseURL : baseURL.concat('/');
            return new URL(path, normalizedBaseURL);
        } else {
            return new URL(path);
        }
    }

    removeEmpty(data) {
        Object.keys(data).forEach(
            (key) => (data[key] == null || data[key] === undefined) && delete data[key],
        );
        return data;
    }

    onResponse(response) {
        return response.data || null;
    }

    async get(url, config = {}) {
        return this.fetch(url, { ...config, method: 'GET' });
    }

    async post(url, config = {}) {
        return this.fetch(url, { ...config, method: 'POST' });
    }

    async patch(url, config = {}) {
        return this.fetch(url, { ...config, method: 'PATCH' });
    }

    async put(url, config = {}) {
        return this.fetch(url, { ...config, method: 'PUT' });
    }

    async delete(url, config = {}) {
        return this.fetch(url, { ...config, method: 'DELETE' });
    }

    async fetch(path, config) {
        let options = {
            method: config.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-app-name': 'stellar',
                ...this.authHeaders,
                ...(config.headers || {}),
            },
            timeout: config.timeout || this.timeout || 5000,
            auth: config.auth || this.auth,
        };

        if (config?.headers?.['Content-Type']) {
            options.headers['Content-Type'] = 'application/json';
        }

        if (config.data) {
            if (config.method === 'GET') {
                options.params = this.removeEmpty(config.data);
            } else {
                options.data = config.data;
            }
        }

        options.url = await this.resolveURL(path).toString();

        if (this.beforeRequest) {
            options = await this.beforeRequest(options);
        }

        try {
            const response = await axios(options);
            return this.onResponse(response, options);
        } catch (e) {
            if (e.response) {
                throw e.response;
            } else if (e.request) {
                throw e.request;
            } else {
                throw new Error('Something happened in setting up the request');
            }
        }
    }
}

export default Api;
