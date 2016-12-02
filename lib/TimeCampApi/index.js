import autobind from 'class-autobind';

import * as C from './constants';

import ApiError from '../ApiError';
import StringBuilder from '../StringBuilder';
import ApiRequest from '../ApiRequest';

import User from './User';
import Timer from './Timer';
import TimeEntry from './TimeEntry';
import Task from './Task';
import TaskMobile from './TaskMobile';

import 'string-format';

export default class TimeCampApi {
    constructor(apiToken = null,
                restApiEndpoint = 'https://www.timecamp.com/third_party/api',
                allowUnsecureRequests = false) {
        if (!this.isUrlSecure(restApiEndpoint) && !allowUnsecureRequests) {
            throw new ApiError(0, C.MESSAGE_INSECURE_PROTOCOL, [`${restApiEndpoint}`]);
        }

        this.restApiEndpoint = this.appendSlash(restApiEndpoint);
        this.restApiFormat = C.FORMAT_JSON;

        this.apiRequest = new ApiRequest(new StringBuilder(this.restApiEndpoint, this.restApiFormat), null);
        this.apiRequest.setResponseFormat(this.restApiFormat);

        this.setToken(apiToken);

        this.user = new User(this.apiRequest);
        this.timer = new Timer(this.apiRequest);
        this.timeEntry = new TimeEntry(this.apiRequest);
        this.task = new Task(this.apiRequest);
        this.taskMobile = new TaskMobile(this.apiRequest);

        this.isUrlSecure = this.isUrlSecure.bind(this);

        autobind(this);
    }

    appendSlash(url) {
        return url.replace(/\/?(\?|#|$)/, '/$1');
    }

    isUrlSecure(url) {
        return url.startsWith('https:');
    }

    setToken(token) {
        this.apiRequest.setAuthHeader(token);
    }



    async userGetToken(email, password) {
        let response = await this.apiRequest.dispatch(
            'post',
            {
                email: email,
                pass_hash: password,
            },
            C.TOKEN,
            true
        );

        response.data = {token: response.data};

        return response;
    }


    async userRegister(email, password) {
        let requestBody = {
            email: email,
            pass_hash: password,
        };

        return await this.apiRequest.dispatch(
            'post_form',
            requestBody,
            C.REGISTER,
            true
        );
    }

    async userResetPassword(email) {
        let requestBody = {
            email: email,
        };

        return await this.apiRequest.dispatch(
            'post_form',
            requestBody,
            C.RESET_PASSWORD,
            true
        );
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
