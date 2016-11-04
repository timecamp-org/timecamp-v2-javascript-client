import autobind from 'class-autobind';

import * as C from './constants';

import ApiError from '../ApiError';
import StringBuilder from '../StringBuilder';
import ApiRequest from '../ApiRequest';

import User from './User';
import Entry from './Entry';

import 'string-format';

export default class TimeCampApi {
    constructor(apiToken,
                restApiEndpoint = 'https://www.timecamp.com/third_party/api',
                allowUnsecureRequests = false) {
        if (!this.isUrlSecure(restApiEndpoint) && !allowUnsecureRequests) {
            throw new ApiError(0, C.MESSAGE_INSECURE_PROTOCOL, [`${restApiEndpoint}`]);
        }

        this.restApiEndpoint = this.appendSlash(restApiEndpoint);
        this.restApiFormat = C.FORMAT_JSON;

        this.apiRequest = new ApiRequest(new StringBuilder(this.restApiEndpoint, this.restApiFormat), null);
        this.apiRequest.setAuthHeader(apiToken);
        this.apiRequest.setResponseFormat(this.restApiFormat);

        this.user = new User(this.apiRequest);
        this.entry = new Entry(this.apiRequest);

        this.isUrlSecure = this.isUrlSecure.bind(this);

        autobind(this);
    }

    appendSlash(url) {
        return url.replace(/\/?(\?|#|$)/, '/$1');
    }

    isUrlSecure(url) {
        return url.startsWith('https:');
    }

    async firstTest() {
        return await this.apiRequest.dispatch(
            'get',
            {
                email: null,
                name: null,
            },
            C.TASKS,
        );
    }

    async userRegister(username, password) {
        return await this.apiRequest.dispatch(
            'post',
            {
                email: username,
                password,
                name: username,
            },
            C.USER_REGISTER,
        );
    }

    async passwordResetByUserId(userId) {
        return await this.apiRequest.dispatch(
            'post',
            false,
            C.USER_RESET_PASSWORD_BY_USER_ID.format({userId}),
        );
    }

    async passwordResetByUserEmail(userEmail) {
        return await this.apiRequest.dispatch(
            'post',
            false,
            C.USER_RESET_PASSWORD_BY_USER_EMAIL.format({userEmail}),
        );
    }

    async passwordUpdate(passwordResetTokenFromEmail, newPassword) {
        return await this.apiRequest.dispatch(
            'patch',
            {
                resetPasswordToken: passwordResetTokenFromEmail
            },
            C.THIS_USER_CHANGE_PASSWORD.format({userId}),
        );
    }
}
