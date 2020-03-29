import { SAVE_POKERBOARD, POKERBOARD_BAD_REQUEST } from '../../constants';
import { createPokerBoard } from '../createPokerBoard';

describe('createPokerBoard Reducer', () => {

    const initialState = {
        error: null
    };

    it('Should return default state', () => {
        const newState = createPokerBoard(undefined, {});
        expect(newState).toEqual(initialState);
    });

    describe('Should return new state if passing type', () => {

        it('Passing user state', () => {
            
            const reqState = {
                "error": false
            }

            const newState = createPokerBoard(undefined, {
                type: SAVE_POKERBOARD
            });

            expect(newState).toEqual(reqState);
        });

        it('Passing bad request', () => {
            const error = "Pokerboard not saved";

            const reqState = {
                "error": "Pokerboard not saved"
            };
            const newState = createPokerBoard(undefined, {
                type: POKERBOARD_BAD_REQUEST,
                payload: error
            });
            expect(newState).toEqual(reqState);
        });

    });

});
