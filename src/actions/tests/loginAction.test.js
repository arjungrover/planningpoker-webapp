import { login } from '../login';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { FETCH_USER, BAD_REQUEST } from '../../constants';

const mockStore = configureMockStore([thunk]);

const testStore = mockStore({
    auth: { user: "", error: "" }
});

jest.mock("../../services/loginPost");

import { loginPost } from '../../services/loginPost';

describe('Testing Login Action', () => {

    beforeEach(() => 
        moxios.install()
    );

    afterEach(() => 
        moxios.uninstall()
    );
    const user = {
        email: "example@gmail.com",
        password: "password"
    }

    it("Checking the FETCH_USER action", done => {
        loginPost.mockReturnValueOnce(
            Promise.resolve({
                data: user
            })
        );
        const expectedActions = [
            {
                type: FETCH_USER,
                payload: user
            }
        ];
        testStore.dispatch(login("test"))
        .then(() => {
            expect(testStore.getActions()).toEqual(expectedActions);
        });
        done();
    });

    it("Checking the BAD_REQUEST action", done => {
        loginPost.mockReturnValueOnce(
            Promise.reject({
                response: {
                    data: {
                        email: "User invalid"
                    }
                }
            })
        );
        const expectedActions = [
            {
                type: BAD_REQUEST,
                payload: "User invalid"
            }
        ];
        testStore.dispatch(login("test"))
        .then(() => {
            expect(testStore.getActions()).toEqual(expectedActions);
        });
        done();
    });

});
