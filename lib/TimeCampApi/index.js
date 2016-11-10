import autobind from 'class-autobind';

import * as C from './constants';

import ApiError from '../ApiError';
import StringBuilder from '../StringBuilder';
import ApiCacheRequest from '../ApiCacheRequest';
import ApiRequest from '../ApiRequest';

import User from './User';
import Entry from './Entry';
import Task from './Task';

import PouchDB from 'pouchdb'

import 'string-format';

export default class TimeCampApi {
    constructor(apiToken,
                restApiEndpoint = 'https://www.timecamp.com/third_party/api',
                allowUnsecureRequests = false,
                PouchDB = null) {
        if (!this.isUrlSecure(restApiEndpoint) && !allowUnsecureRequests) {
            throw new ApiError(0, C.MESSAGE_INSECURE_PROTOCOL, [`${restApiEndpoint}`]);
        }

        this.restApiEndpoint = this.appendSlash(restApiEndpoint);
        this.restApiFormat = C.FORMAT_JSON;

        this.apiCacheRequest = new ApiCacheRequest(new StringBuilder(this.restApiEndpoint, this.restApiFormat), PouchDB);
        this.apiCacheRequest.setAuthHeader(apiToken);
        this.apiCacheRequest.setResponseFormat(this.restApiFormat);

        this.user = new User(this.apiCacheRequest);
        this.entry = new Entry(this.apiCacheRequest);
        this.task = new Task(this.apiCacheRequest);

        this.isUrlSecure = this.isUrlSecure.bind(this);

        autobind(this);
    }

    appendSlash(url) {
        return url.replace(/\/?(\?|#|$)/, '/$1');
    }

    isUrlSecure(url) {
        return url.startsWith('https:');
    }

    // async userRegister(username, password) {
    //     return await this.apiRequest.dispatch(
    //         'post',
    //         {
    //             email: username,
    //             password,
    //             name: username,
    //         },
    //         C.USER_REGISTER,
    //     );
    // }
    //
    // async passwordResetByUserId(userId) {
    //     return await this.apiRequest.dispatch(
    //         'post',
    //         false,
    //         C.USER_RESET_PASSWORD_BY_USER_ID.format({userId}),
    //     );
    // }
    //
    // async passwordResetByUserEmail(userEmail) {
    //     return await this.apiRequest.dispatch(
    //         'post',
    //         false,
    //         C.USER_RESET_PASSWORD_BY_USER_EMAIL.format({userEmail}),
    //     );
    // }
    //
    // async passwordUpdate(passwordResetTokenFromEmail, newPassword) {
    //     return await this.apiRequest.dispatch(
    //         'patch',
    //         {
    //             resetPasswordToken: passwordResetTokenFromEmail
    //         },
    //         C.THIS_USER_CHANGE_PASSWORD.format({userId}),
    //     );
    // }
}
