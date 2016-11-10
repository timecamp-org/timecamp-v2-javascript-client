import * as C from '../constants';
import * as Utils from '../utils.js';

export default class Task {
    constructor(apiRequest) {
        this.apiRequest = apiRequest;
    }

    async get(optional) {
        let defaults = {
            exclude_archived: undefined,
            task_id: undefined,
        };
        let requestBody = Utils.filterOptional(defaults, optional);

        return await this.apiRequest.dispatch(
            'get',
            requestBody,
            C.TASKS,
        );
    }

    async add(taskName, optional) {
        let defaults = {
            name: taskName,
            tags: undefined,
            parent_id: undefined,
            external_task_id: undefined,
            external_parent_id: undefined,
            budgeted: undefined,
            note: undefined,
            archived: undefined,
            billable: undefined,
            budget_unit: undefined,
            user_ids: undefined,
            role: undefined,
        };
        let requestBody = Utils.filterOptional(defaults, optional);

        return await this.apiRequest.dispatch(
            'post',
            requestBody,
            C.TASKS,
        );
    }

    async edit(taskId, optional) {
        let defaults = {
            task_id: taskId,
            name: undefined,
            tags: undefined,
            parent_id: undefined,
            external_task_id: undefined,
            external_parent_id: undefined,
            budgeted: undefined,
            note: undefined,
            archived: undefined,
            billable: undefined,
            budget_unit: undefined,
            user_ids: undefined,
            role: undefined,
        };
        let requestBody = Utils.filterOptional(defaults, optional);

        return await this.apiRequest.dispatch(
            'put',
            requestBody,
            C.TASKS,
        );
    }
}
