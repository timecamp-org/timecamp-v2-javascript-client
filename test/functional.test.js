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
                '75c4eb87c870cab5f242a866bb',
                'http://localhost:8080/third_party/api',
                true,
                PouchDB);

            expect(true).toEqual(true);
        });

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
                const apiResponse = await timecampApi.entry.get('2015-06-05', '2015-07-07', {user_ids: '100118', blebel:34});
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
                const apiResponse = await timecampApi.entry.edit(newEntryId, {note: 'lol'}); //newEntryId
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
