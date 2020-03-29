import { verifyToken } from '../verifyToken';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { VERIFY_TOKEN, SIGNUP_BAD_REQUEST } from '../../constants';

const mockStore = configureMockStore([thunk]);

const testStore = mockStore({
    auth: { user: "", error: "" }
});

jest.mock("../../services/verifyTokenAPI");

import { verifyTokenAPI } from '../../services/verifyTokenAPI';

describe('Testing Verify Token Action', () => {

    beforeEach(() => 
        moxios.install()
    );

    afterEach(() => 
        moxios.uninstall()
    );
    const token = "abc";

    it("Checking the FETCH_USER action", done => {
        verifyTokenAPI.mockReturnValueOnce(
            Promise.resolve({
                data: token
            })
        );
        const expectedActions = [
            {
                type: VERIFY_TOKEN,
                payload: token
            }
        ];
        testStore.dispatch(verifyToken("test"))
        .then(() => {
            expect(testStore.getActions()).toEqual(expectedActions);
        });
        done();
    });

    it("Checking the BAD_REQUEST action", done => {
        verifyTokenAPI.mockReturnValueOnce(
            Promise.reject({
                response: {
                    data: "Token invalid"
                }
            })
        );
        const expectedActions = [
            {
                type: SIGNUP_BAD_REQUEST,
                payload: "Token invalid"
            }
        ];
        testStore.dispatch(verifyToken("test"))
        .then(() => {
            expect(testStore.getActions()).toEqual(expectedActions);
        });
        done();
    });

});
