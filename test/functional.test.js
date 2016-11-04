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



        it('works', async function() {
            const apiResponse = await timecampApi.firstTest(username, password);
            // if (!apiResponse.error) {
            //
            //     // TODO: Check if response.data fields are correct
            // } else {
            //     throw new Error(apiResponse.error.errorMessage);
            // }
        }).timeout(10000);

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

            let user;

            let newTimerId;

                it('start timer', async function () {
                    const apiResponse = await timecampApi.user.timerStart();
                    newTimerId = apiResponse.data.new_timer_id;
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
                console.log(apiResponse);
                newEntryId = apiResponse.data.entry_id;
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);

            it('edit existing entry', async function () {
                const apiResponse = await timecampApi.entry.update(23, {note: 'lol'}); //newEntryId
                console.log(apiResponse);
                if (!apiResponse.error) {
                    // TODO: Check if response.data fields are correct
                } else {
                    throw new Error(apiResponse.error.errorMessage);
                }
            }).timeout(10000);
        });
    });
});
