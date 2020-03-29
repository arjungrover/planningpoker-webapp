import { signUp } from '../signUp';
import { SIGNUP_BAD_REQUEST, SAVE_USER } from '../../constants';

describe('SignUp Reducer', () => {

    const initialState = {
        error: null
    };

    it('Should return default state', () => {
        const newState = signUp(undefined, {});
        expect(newState).toEqual(initialState);
    });

    describe('Should return new state if passing type', () => {

        it('Passing user state', () => {
            
            const reqState = {
                "error": false
            }

            const newState = signUp(undefined, {
                type: SAVE_USER
            });

            expect(newState).toEqual(reqState);
        });

        it('Passing bad request', () => {
            const error = "User with this email already exists";

            const reqState = {
                "error": "User with this email already exists",
                "user": null
            };
            const newState = signUp(undefined, {
                type: SIGNUP_BAD_REQUEST,
                payload: error
            });
            expect(newState).toEqual(reqState);
        });

    });

});
