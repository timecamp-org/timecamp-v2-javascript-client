import expect from 'expect';

import TimeCampApi from '../lib';

import * as Utils from './utils';

// TODO: change if (apiResponse.error) to if (!apiResponse.error)
// TODO: for each 'if (apiResponse.error)' add else clause

describe('TimeCamp', () => {

    let timecampApi;

    describe('REST API', () => {
        it('exists', () => {
            timecampApi = new TimeCampApi(
                'c8c0c7ffec2a68b70b1886bd8f',
                'http://localhost:8080/third_party/api',
                true);

            expect(true).toEqual(true);
        });

        const username = Utils.generateRandomEmail();
        const password = Utils.TEST_PASSWORD;

        // it('can register a new user', async function () {
        //     const apiResponse = await timecampApi.userRegister(username, password);
        //
        //     if (!apiResponse.error) {
        //
        //         // TODO: Check if response.data fields are correct
        //     } else {
        //         throw new Error(apiResponse.error.errorMessage);
        //     }
        // }).timeout(10000);
        //
        describe('user', () => {
                it('start timer', async function () {
                    const apiResponse = await timecampApi.user.timerStart();
                    if (!apiResponse.error) {
                        // TODO: Check if response.data fields are correct
                    } else {
                        throw new Error(apiResponse.error.errorMessage);
                    }
                }).timeout(10000);

                it('stop timer', async function () {
                    const apiResponse = await timecampApi.user.timerStop();
                    if (!apiResponse.error) {
                        // TODO: Check if response.data fields are correct
                    } else {
                        throw new Error(apiResponse.error.errorMessage);
                    }
                }).timeout(10000);

        });

        describe('time entries', () => {
            let newEntryId;

            it('get entries', async function () {
                const apiResponse = await timecampApi.timeEntry.get('2015-06-05', '2015-07-07', {user_ids: '100118', blebel:34});
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            it('add new entry', async function () {
                const apiResponse = await timecampApi.timeEntry.add('2015-06-06', 3600);
                newEntryId = apiResponse.data.timeEntry_id;
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            it('edit existing entry', async function () {
                const apiResponse = await timecampApi.timeEntry.edit(newEntryId, {note: 'lol'}); //newEntryId
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);
        });

        describe('tasks', () => {
            let newTaskId;

            it('get tasks', async function () {
                const apiResponse = await timecampApi.task.get();
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            it('add new task', async function () {
                const apiResponse = await timecampApi.task.add('nameMeME', {note: 'lol'});
                newTaskId = Object.keys(apiResponse.data)[0];
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            it('edit existing task', async function () {
                console.log(newTaskId);

                const apiResponse = await timecampApi.task.edit(newTaskId, {note: 'trololo'}); //newEntryId
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);
        });
    });
});
