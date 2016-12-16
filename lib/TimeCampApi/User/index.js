import autobind from 'class-autobind';

import * as C from '../constants';
import * as Utils from '../../utils.js';


export default class User {
    constructor(apiRequest) {
        this.apiRequest = apiRequest;
    }

    async me() {
        return await this.apiRequest.dispatch(
            'get',
            {},
            C.USER,
        );
    }
}
