import expect from 'expect';

import TimeCampApi from '../lib';
import PouchDB from 'pouchdb'

import * as Utils from './utils';

// TODO: change if (apiResponse.error) to if (!apiResponse.error)
// TODO: for each 'if (apiResponse.error)' add else clause

describe('TimeCamp', () => {

    let timecampApi;

    describe('REST API', () => {
        it('exists', () => {
            timecampApi = new TimeCampApi(
                'apiToken',
                'http://localhost:8080',
                true,
                PouchDB);

            expect(true).toEqual(true);
        });


        const email = Utils.generateRandomEmail();
        const password = Utils.TEST_PASSWORD;

        it('register new user', async function () {
            const apiResponse = await timecampApi.userRegister(email, password);
            if (!apiResponse.error) {
                // TODO: Check if response.data fields are correct
            } else {
                throw new Error(apiResponse.error.errorMessage);
            }
        }).timeout(100000);

        it('reset user password', async function () {
            const apiResponse = await timecampApi.userResetPassword(email);
            if (!apiResponse.error) {
                // TODO: Check if response.data fields are correct
            } else {
                throw new Error(apiResponse.error.errorMessage);
            }
        }).timeout(100000);

        it('get user token', async function () {
            const apiResponse = await timecampApi.userGetToken(email, password);
            if (!apiResponse.error) {
                // TODO: Check if response.data fields are correct
            } else {
                throw new Error(apiResponse.error.errorMessage);
            }

            timecampApi.setToken(apiResponse.data.token);
        }).timeout(10000);

        let currentUser;

        describe('user', () => {
            it('get info about current user', async function () {
                const apiResponse = await timecampApi.user.me();
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }

                currentUser = apiResponse.data;
            }).timeout(10000);

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

        // timecampApi.apiCacheRequest.showAllCachedRequests();


        describe('time entries', () => {
            let newEntryId;

            it('get entries', async function () {
                const apiResponse = await timecampApi.entry.get('2015-06-05', '2015-07-07');
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            it('add new entry', async function () {
                const apiResponse = await timecampApi.entry.add('2015-06-06', 3600);
                newEntryId = apiResponse.data.entry_id;
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            it('edit existing entry', async function () {
                const apiResponse = await timecampApi.entry.edit(newEntryId, {note: 'lol'});
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            it('delete entry', async function () {
                const apiResponse = await timecampApi.entry.delete(newEntryId);
                if (!apiResponse.error) {
                  // TODO: Check if response.data fields are correct
                }
                else {
                  throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);
        });

        describe('tasks', () => {
            let newTaskId;

            it('add new task', async function () {
                const apiResponse = await timecampApi.task.add('nameMeME', {note: 'lol'});
                newTaskId = Object.keys(apiResponse.data)[0];
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            it('get tasks', async function () {
                const apiResponse = await timecampApi.task.get();
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            it('edit existing task', async function () {
                const apiResponse = await timecampApi.task.edit(newTaskId, {note: 'trololo'});
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);
        });

        describe('tasks mobile', () => {
            let newTaskId;

            it('add new task', async function () {
                const apiResponse = await timecampApi.taskMobile.add('nameMeME', {note: 'lol'});
                newTaskId = Object.keys(apiResponse.data)[0];
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            it('get tasks', async function () {
                const apiResponse = await timecampApi.taskMobile.get();
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            // it('edit existing task', async function () {
            //     const apiResponse = await timecampApi.taskMobile.edit(newTaskId, currentUser.user_id, {note: 'trololo'});
            //     console.log(apiResponse)
            //     // if (!apiResponse.error) {
            //     //     // TODO: Check if response.data fields are correct
            //     // } else {
            //     //     throw new Error(apiResponse.error.errorMessage);
            //     // }
            // }).timeout(10000);
        });

        describe('cache requests', () => {
            it('list cached requests', async function () {
                console.log('list cached requests');// await timecampApi.apiCacheRequest.showAllCachedRequests()
                await timecampApi.apiCacheRequest.showAllCachedRequests();
            }).timeout(10000);

            it('resend cached requests', async function () {
                console.log(await timecampApi.apiCacheRequest.sendAllCachedRequests());
            }).timeout(10000);
        });


    });
});
