import { signup } from '../signup';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { SIGNUP_BAD_REQUEST, SAVE_USER } from '../../constants';

const mockStore = configureMockStore([thunk]);

const testStore = mockStore({
    auth: { user: "", error: "" }
});

jest.mock("../../services/signupPost");

import { signupPost } from '../../services/signupPost';

describe('Testing SignUp Action', () => {

    beforeEach(() => 
        moxios.install()
    );

    afterEach(() => 
        moxios.uninstall()
    );

    const user = {
        first_name: "First",
        last_name: "Last",
        email: "example@gmail.com",
        password: "password"
    }

    it("Checking the SAVE_USER action", done => {

        signupPost.mockReturnValueOnce(
            Promise.resolve({
                data: {
                    error: false
                }
            })
        );

        const expectedActions = [
            {
                type: SAVE_USER
            }
        ];
        testStore.dispatch(signup("test"))
        .then(() => {
            expect(testStore.getActions()).toEqual(expectedActions);
        });
        done();
    });

    it("Checking the SIGNUP_BAD_REQUEST action", done => {
        signupPost.mockReturnValueOnce(
            Promise.reject({
                response: {
                    data: {
                        email: "Email already exists"
                    }
                }
            })
        );
        const expectedActions = [
            {
                type: SIGNUP_BAD_REQUEST,
                payload: "Email already exists"
            }
        ];
        testStore.dispatch(signup("test"))
        .then(() => {
            expect(testStore.getActions()).toEqual(expectedActions);
        });
        done();
    });

});
