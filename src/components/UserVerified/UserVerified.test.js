import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { UserVerified } from '.';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);

const testStore = mockStore({
    auth: {
        user: null,
        error: "Invalid Key!"
    },
    login: {
        user: null,
        error: null
    }
});

const setUp = (props) => {
    return mount(
        <Provider store={testStore}>
            <BrowserRouter>
                <UserVerified {...props} />
            </BrowserRouter>
        </Provider>
    )
};

let onSubmitMock = jest.fn();

describe('App', () => {

    const props = {
        verifyToken: onSubmitMock,
        match: {
            params: {
                token: "abc"
            }
        }
    };
    
    it('Should render a the Invalid key div', () => {
        const wrapper = setUp(props);
        expect(wrapper.find('.not-verified-div').length).toEqual(1)
    });

    it('Testing if the action is being called', () => {
        let wrapper = setUp(props);
        expect(onSubmitMock).toBeCalled;
    });

});
