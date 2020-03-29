import React from 'react';
import { mount } from 'enzyme';
import { LoginComponent } from './index';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const testStore = mockStore({
    login: { user: "", error: "" }
});

let onSubmitMock = jest.fn();

const setUp = (props) => {
    return mount(
        <Provider store={testStore}>
            <BrowserRouter>
                <LoginComponent {...props} />
            </BrowserRouter>
        </Provider>
    )
};

describe('Testing onSubmit', () => {
    let user = {
        email: "example@gmail.com",
        password: "password"
    };

    const props = {
        login: onSubmitMock,
        clearError: jest.fn()
    };

    it('Testing if the action is being called and Should get proper arguments', () => {
        let wrapper = setUp(props);

        wrapper.find('input[name="email"]').simulate('change', { target: { name: 'email', value: 'example@gmail.com' } });
        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: 'password' } });
        
        const button = wrapper.find('input[type="submit"]');
        
        button.simulate('submit');
        expect(onSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock).toHaveBeenCalledWith(user);
    });

});
