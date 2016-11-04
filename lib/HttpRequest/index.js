export default class HttpRequest {
    constructor() {
        this.options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
    }

    setHeader(headerName, headerContent) {
        this.options['headers'][headerName] = headerContent;
    }

    get(url, extraOptions = {}) {
        const request = Object.assign(
            {method: 'GET'},
            this.options,
            extraOptions
        );
        return this.fireRequest(url, request);
    }

    post(url, jsonPayload = {}, extraOptions = {}) {
        const request = Object.assign(
            {method: 'POST'},
            this.options,
            {body: JSON.stringify(jsonPayload)},
            extraOptions
        );

        return this.fireRequest(url, request);
    }

    put(url, jsonPayload = {}, extraOptions = {}) {
        const request = Object.assign(
            {method: 'PUT'},
            this.options,
            {body: JSON.stringify(jsonPayload)},
            extraOptions
        );

        return this.fireRequest(url, request);
    }

    patch(url, jsonPayload = {}, extraOptions = {}) {
        const request = Object.assign(
            {method: 'PATCH'},
            this.options,
            {body: JSON.stringify(jsonPayload)},
            extraOptions
        );

        return this.fireRequest(url, request);
    }

    delete(url, extraOptions = {}) {
        const request = Object.assign(
            {method: 'DELETE'},
            this.options,
            extraOptions
        );

        return this.fireRequest(url, request);
    }

    fireRequest(url, options) {
        return fetch(url, options);
    }

}
