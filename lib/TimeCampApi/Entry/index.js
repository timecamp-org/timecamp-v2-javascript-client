import * as C from '../constants';
import * as Utils from '../../utils.js';

export default class Entry {
    constructor(apiRequest) {
        this.apiRequest = apiRequest;
    }

    async get(dateFrom, dateTo, optional) {
        let defaults = {
            from: dateFrom,
            to: dateTo,
            task_ids: undefined,
            with_subtasks: undefined,
            user_ids: undefined,
        };
        let requestBody = Utils.filterOptional(defaults, optional);

        return await this.apiRequest.dispatch(
            'get',
            requestBody,
            C.TIME_ENTRIES,
        );
    }

    async add(date, duration, optional) {
        let defaults = {
            date: date,
            duration: duration,
            note: undefined,
            start_time: undefined,
            stop_time: undefined,
        };

        let requestBody = Utils.filterOptional(defaults, optional);

        return await this.apiRequest.dispatch(
            'post',
            requestBody,
            C.TIME_ENTRIES,
        );
    }

    async edit(entryId, optional) {
        let defaults = {
            id: entryId,
            duration: undefined,
            note: undefined,
            start_time: undefined,
            end_time: undefined,
            billable: undefined,
            invoideId: undefined,
            task_id: undefined,
            updateActivities: undefined,
        };

        let requestBody = Utils.filterOptional(defaults, optional);

        return await this.apiRequest.dispatch(
            'put',
            requestBody,
            C.TIME_ENTRIES,
        );
    }

    async delete(entryId, optional) {
      let defaults = {
        id: entryId,
      }

      let requestBody = Utils.filterOptional(defaults, optional)

      return await this.apiRequest.dispatch(
        'delete_form',
        requestBody,
        C.TIME_ENTRIES,
        true,
      )
    }
}
