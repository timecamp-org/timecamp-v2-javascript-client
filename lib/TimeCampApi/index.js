import autobind from 'class-autobind';

import * as C from './constants';

import ApiError from '../ApiError';
import StringBuilder from '../StringBuilder';
import CachedApiRequest from '../CachedApiRequest';
import ApiRequest from '../ApiRequest';

import User from './User';
import Timer from './Timer';
import TimeEntry from './TimeEntry';
import Task from './Task';
import TaskMobile from './TaskMobile';

import 'string-format';

export default class TimeCampApi {
    constructor(
                restApiEndpoint = 'https://www.timecamp.com/',
                apiToken = null,
                enableCache = false,
                PouchDbImport = null) {
        autobind(this);

        this.restApiEndpoint = this.appendSlash(restApiEndpoint);
        this.restApiFormat = C.FORMAT_JSON;

        // if disable cache, different class
        if (enableCache === true) {
          if(!PouchDbImport){
            throw new Error(` if u want to enable cache u must provide pouchdb import`)
          }
          this.apiRequest = new CachedApiRequest(new StringBuilder(this.restApiEndpoint, this.restApiFormat), PouchDB);
        }
        else {
          this.apiRequest = new ApiRequest(new StringBuilder(this.restApiEndpoint, this.restApiFormat));
        }

        this.apiRequest.setAuthHeader(apiToken);
        this.apiRequest.setResponseFormat(this.restApiFormat);

        this.setToken(apiToken);

        this.user = new User(this.apiRequest);
        this.timer = new Timer(this.apiRequest);
        this.timeEntry = new TimeEntry(this.apiRequest);
        this.task = new Task(this.apiRequest);
        this.taskMobile = new TaskMobile(this.apiRequest);

        autobind(this);
    }

    appendSlash(url) {
        return url.replace(/\/?(\?|#|$)/, '/$1');
    }

    setToken(token) {
        this.apiRequest.setAuthHeader(token);
    }

    async sendAllCachedRequests () {
      return await this.apiRequest.sendAllCachedRequests()
    }

    async userGetToken(email, password) {
        return await this.apiRequest.dispatch(
            'post_form',
            {
                email: email,
                pass_hash: password,
            },
            C.TOKEN,
            true
        );
    }

    async userRegister(email, password) {
        return await this.apiRequest.dispatch(
            'post_form',
            {
                email: email,
                pass_hash: password,
            },
            C.REGISTER,
            true
        );
    }

    async userResetPassword(email) {
        return await this.apiRequest.dispatch(
            'post_form',
            {
                email: email,
            },
            C.RESET_PASSWORD,
            true
        );
    }
}
