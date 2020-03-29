import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { SAVE_POKERBOARD, POKERBOARD_BAD_REQUEST } from '../../constants';  
import { createPokerBoard } from '../createPokerBoard';

const mockStore = configureMockStore([thunk]);

const testStore = mockStore({
    pokerdb: { error: "" }
});

jest.mock("../../services/createPokerBoardPost");

import { createPokerBoardPost } from '../../services/createPokerBoardPost';

describe('Testing createPokerBoard Action', () => {

    beforeEach(() => 
        moxios.install()
    );

    afterEach(() => 
        moxios.uninstall()
    );

    it("Checking the SAVE_POKERBOARD action", done => {
        createPokerBoardPost.mockReturnValueOnce(
            Promise.resolve({
                error: false
            })
        );
        const expectedActions = [
            {
                type: SAVE_POKERBOARD,
                payload: undefined
            }
        ];
        testStore.dispatch(createPokerBoard("test"))
        .then(() => {
            expect(testStore.getActions()).toEqual(expectedActions);
        });
        done();
    });

    it("Checking the BAD_REQUEST action", done => {
        createPokerBoardPost.mockReturnValueOnce(
            Promise.reject({
                response: "Could not save pokerboard"
            })
        );
        const expectedActions = [
            {
                type: POKERBOARD_BAD_REQUEST,
                payload: "Could not save pokerboard"
            }
        ];
        testStore.dispatch(createPokerBoard("test"))
        .then(() => {
            expect(testStore.getActions()).toEqual(expectedActions);
        });
        done();
    });

});
