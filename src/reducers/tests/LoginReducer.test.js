import { login } from '../login';
import { FETCH_USER, BAD_REQUEST } from '../../constants';

describe('Login Reducer', () => {

    const initialState = {
        user: null,
        error: null
    };

    it('Should return default state', () => {
        const newState = login(undefined, {});
        expect(newState).toEqual(initialState);
    });

    describe('Should return new state if passing type', () => {

        it('Passing user state', () => {
            const user = {
                "email": "example@gmail.com",
                "password": "password"
            }
            const reqState = {
                "error": null, 
                "user": {
                    "email": "example@gmail.com", 
                    "password": "password"
                }
            }
            const newState = login(undefined, {
                type: FETCH_USER,
                payload: user
            })
            expect(newState).toEqual(reqState);
        });

        it('Passing bad request', () => {
            const error = "Invalid credentials";
        
            const reqState = {
                "error": "Invalid credentials", 
                "user": null
            };
            const newState = login(undefined, {
                type: BAD_REQUEST,
                payload: error
            });
            expect(newState).toEqual(reqState);
        });

    });

});
