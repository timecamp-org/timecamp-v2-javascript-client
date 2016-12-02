import autobind from 'class-autobind';

import * as C from '../constants';
import * as Utils from '../../utils.js';


export default class Timer {
    constructor(apiRequest) {
        this.apiRequest = apiRequest;
    }

    async start(optional) {
        let defaults = {
            task_id: undefined,
            entry_id: undefined,
            started_at: undefined
        };
        let requestBody = Utils.filterOptional(defaults, optional);
        requestBody.action = 'start';

        return await this.apiRequest.dispatch(
            'post',
            requestBody,
            C.TIMER,
        );
    }

    async status() {
        return await this.apiRequest.dispatch(
            'post',
            {
                action: 'status'
            },
            C.TIMER,
        );
    }

    async stop(optional) {
        let defaults = {
            timer_id: undefined,
            stopped_at: undefined,
        };
        let requestBody = Utils.filterOptional(defaults, optional);
        requestBody.action = 'stop';

        return await this.apiRequest.dispatch(
            'post',
            requestBody,
            C.TIMER,
        );
    }

}
