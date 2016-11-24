import * as Utils from '../utils';

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

    deleteForm(url, jsonPayload = {}, extraOptions = {}) {
      let options = this.options
      options['Content-type'] = 'application/x-www-form-urlencoded'
      const request = Object.assign(
          {method: 'DELETE'},
          options,
          {body: Utils.createQueryString(jsonPayload).substr(1)},
          extraOptions
      );

      return this.fireRequest(url, request);
    }

    postForm(url, jsonPayload = {}, extraOptions = {}) {
        const request = Object.assign(
            {method: 'POST'},
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/x-www-form-urlencoded'
                },
            },
            {body: Utils.createQueryString(jsonPayload).substr(1)},
            extraOptions
        );

        return this.fireRequest(url, request);
    }

    fireRequest(url, options) {
        return fetch(url, options);
    }

}
