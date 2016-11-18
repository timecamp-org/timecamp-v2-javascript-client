import autobind from 'class-autobind';

import * as C from '../constants';
import * as Utils from '../../utils.js';


export default class User {
    constructor(apiRequest) {
        this.apiRequest = apiRequest;
    }

    // async authenticateWithCookie(username, password) {
    //     const apiResponse = await this.apiRequest.dispatch(
    //         'post',
    //         {
    //             login: username,
    //             password,
    //             type: 'cookie',
    //         },
    //         C.USER_AUTHENTICATE,
    //     );
    //
    //     return apiResponse;
    // }
    //
    // async authenticateWithToken(username, password, deviceId, appName) {
    //     const apiResponse = await this.apiRequest.dispatch(
    //         'post',
    //         {
    //             login: username,
    //             password,
    //             deviceId,
    //             appName,
    //             type: 'token',
    //         },
    //         C.USER_AUTHENTICATE,
    //     );
    //
    //     if (!apiResponse.error) {
    //         this.apiRequest.setAuthHeader(apiResponse.data.token);
    //     }
    //
    //     return apiResponse;
    // }
    //
    //
    // async passwordUpdate(currentPassword, newPassword) {
    //     return await this.apiRequest.dispatch(
    //         'patch',
    //         {
    //             currentPassword, // TODO: Fix documentation inconsistency
    //             newPassword,
    //         },
    //         C.THIS_USER_CHANGE_PASSWORD
    //     );
    // }
    //
    //
    // async infoRead() {
    //     return await this.apiRequest.dispatch(
    //         'get',
    //         false,
    //         C.THIS_USER_INFORMATION,
    //     );
    // }

    async me() {
        return await this.apiRequest.dispatch(
            'get',
            {},
            C.USER,
        );
    }

    async timerStart(optional) {
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

    async timerStatus() {
        return await this.apiRequest.dispatch(
            'post',
            {
                action: 'status'
            },
            C.TIMER,
        );
    }

    async timerStop(optional) {
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

    // async timerCancel() {
    //     return await this.apiRequest.dispatch(
    //         'post',
    //         {
    //             action: 'cancel'
    //         },
    //         C.TIMER,
    //     );
    // }




    // async infoUpdate(userInfo) {
    //   return await this.apiRequest.dispatch(
    //     'patch',
    //     userInfo,
    //     C.THIS_USER_INFORMATION,
    //   );
    // }
    //
    //
    // async notificationsRead() {
    //   return await this.apiRequest.dispatch(
    //     'get',
    //     false,
    //     C.THIS_USER_NOTIFICATIONS,
    //   );
    // }
    //
    //
    // async projectCreate(projectData) {
    //   return await this.apiRequest.dispatch(
    //     'post',
    //     projectData,
    //     C.PROJECTS,
    //   );
    // }
    //
    // async projectUpdate(projectData) {
    //   return await this.apiRequest.dispatch(
    //     'patch',
    //     projectData,
    //      C.PROJECT.format(projectId),
    //   );
    // }
    //
    // async projectRead(projectId) {
    //   return await this.apiRequest.dispatch(
    //     'get',
    //     false,
    //     C.PROJECT.format(projectId),
    //   );
    // }
    //
    //
    // async projectDelete(projectId) {
    //   return await this.apiRequest.dispatch(
    //     'delete',
    //     false,
    //     C.PROJECT.format(projectId),
    //   );
    // }
    //
    // async projectsRead() {
    //   return await this.apiRequest.dispatch(
    //     'get',
    //     false,
    //     C.THIS_USER_PROJECTS,
    //   );
    // }
    //
    // async timerRead() {
    //   return await this.apiRequest.dispatch(
    //     'get',
    //     false,
    //     C.THIS_USER_TIMER,
    //   );
    // }
    //
    // async timerStart(taskId, startTime) {
    //   return await this.apiRequest.dispatch(
    //     'patch',
    //     {
    //       startTime,
    //     },
    //     C.THIS_USER_TIMER,
    //   );
    // }
    //
    // async timerStop(stopTime) {
    //   return await this.apiRequest.dispatch(
    //     'patch',
    //     {
    //       stopTime,
    //     },
    //     C.THIS_USER_TIMER,
    //   );
    // }
    //
    // async timeEntryCreate(timeEntry) {
    //   return await this.apiRequest.dispatch(
    //     'post',
    //     timeEntry,
    //     C.THIS_USER_TIMER,
    //   );
    // }
    //
    // async timeEntryRead(timeEntryId) {
    //   return await this.apiRequest.dispatch(
    //     'get',
    //     false,
    //     C.TIME_ENTRY.format(timeEntryId),
    //   );
    // }
    //
    // async timeEntryUpdate(timeEntry) {
    //   return await this.apiRequest.dispatch(
    //     'patch',
    //     timeEntry,
    //     C.TIME_ENTRY.format(timeEntryId),
    //   );
    // }
    //
    // async timeEntryDelete(timeEntryId) {
    //   return await this.apiRequest.dispatch(
    //     'delete',
    //     false,
    //     C.TIME_ENTRY.format(timeEntryId),
    //   );
    // }

}
