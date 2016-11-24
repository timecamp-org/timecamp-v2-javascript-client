import autobind from 'class-autobind';
import HttpRequest from '../HttpRequest';
import ApiResponse from '../ApiResponse';
import * as Utils from '../utils.js';

const AUTH_HEADER_NAME = 'Authorization';

export default class ApiRequest {
    constructor(restApiUrlBuilder) {
        autobind(this);

        this.restApiUrlBuilder = restApiUrlBuilder;
        this.httpRequest = new HttpRequest();
    }

    setAuthHeader(authToken) {
        this.httpRequest.setHeader(AUTH_HEADER_NAME, authToken);
        if (!authToken) {
            console.warn(`Header ${AUTH_HEADER_NAME} has been set empty value '${authToken}'.`)
        }
    }

    setResponseFormat(newFormat) {
        this.responseFormat = newFormat;
    }

    async dispatch(method, data, endpoint, isResponsePlainText = false) {
        let httpResponse;
        switch (method.toUpperCase()) {
            case 'GET': {
                httpResponse = await this.httpRequest.get(
                    this.restApiUrlBuilder.setSuffix(endpoint + Utils.createQueryString(data)),
                    {
                        credentials: 'include',
                    }
                );
                break;
            }
            case 'POST': {
                httpResponse = await this.httpRequest.post(
                    this.restApiUrlBuilder.setSuffix(endpoint),
                    data,
                    {
                        credentials: 'include',
                    }
                );
                break;
            }
            case 'PUT': {
                httpResponse = await this.httpRequest.put(
                    this.restApiUrlBuilder.setSuffix(endpoint),
                    data,
                    {
                        credentials: 'include',
                    }
                );
                break;
            }
            case 'PATCH': {
                httpResponse = await this.httpRequest.patch(
                    this.restApiUrlBuilder.setSuffix(endpoint),
                    data,
                    {
                        credentials: 'include',
                    }
                );
                break;
            }
            case 'DELETE': {
                httpResponse = await this.httpRequest.delete(
                    this.restApiUrlBuilder.setSuffix(endpoint),
                    {
                        credentials: 'include',
                    }
                );
                break;
            }
            case 'DELETE_FORM': {
              httpResponse = await this.httpRequest.deleteForm(
                  this.restApiUrlBuilder.setSuffix(endpoint),
                  data,
                  {
                      credentials: 'include',
                  }
              );
              break;
            }
            case 'POST_FORM': {
                httpResponse = await this.httpRequest.postForm(
                    this.restApiUrlBuilder.setSuffix(endpoint),
                    data,
                    {
                        credentials: 'include',
                    }
                );

                break;
            }
            default: {
                throw new Error(`Method not implemented "${method}".`);
            }
        }

        let response;

        if (isResponsePlainText) {
            response = await ApiResponse.parseRawResponse(httpResponse);
        } else {
            response = await ApiResponse.parseHttpResponse(httpResponse);
        }

        return response;
    }
}
