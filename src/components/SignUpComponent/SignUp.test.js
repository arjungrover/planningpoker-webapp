import React from 'react';
import { mount } from 'enzyme';
import { SignUpComponent } from './index';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const testStore = mockStore({
    auth: { user: "", error: "" }
});

let onSubmitMock = jest.fn();

const setUp = (props) => {
    return mount(
        <Provider store={testStore}>
            <BrowserRouter>
                <SignUpComponent {...props} />
            </BrowserRouter>
        </Provider>
    )
};

describe('Testing onSubmit', () => {
    let user = {
        email: "example@gmail.com",
        first_name: "First",
        last_name: "Last",
        password: "password"
    };

    const props = {
        signup: onSubmitMock,
        clearError: jest.fn()
    };

    it('Testing if the action is being called', () => {
        let wrapper = setUp(props);
        const button = wrapper.find('input[type="submit"]');
        button.simulate('click');
        expect(onSubmitMock).toBeCalled;
    });

    it('Should get proper arguments', () => {
        let wrapper = setUp(props);

        wrapper.update();

        wrapper.find('input[name="first_name"]').simulate('change', { target: { name: 'first_name', value: 'First' } });
        wrapper.find('input[name="last_name"]').simulate('change', { target: { name: 'last_name', value: 'Last' } });
        wrapper.find('input[name="email"]').simulate('change', { target: { name: 'email', value: 'example@gmail.com' } });
        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: 'password' } });
        
        const button = wrapper.find('input[type="submit"]');
        
        button.simulate('submit');
        expect(onSubmitMock).toHaveBeenCalledWith(user);
    });

});


describe('Test case for testing SignUp Component', () => {

    let wrapper;

    const props = {
        signup: jest.fn(),
        clearError: jest.fn()
    };

    it('checking passwords matching with right data', () => {

        wrapper = setUp(props);

        const child = wrapper.find('.password-error');

        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: 'asdfghjkl1234567890' } });
        wrapper.find('input[name="confirm_password"]').simulate('change', { target: { name: 'confirm_password', value: 'asdfghjkl1234567890' } });
        wrapper.find('input[type="submit"]').simulate('click');

        expect(child.text()).toContain("");
    });

    it('checking passwords matching with wrong data', () => {

        wrapper = setUp(props);

        const child = wrapper.find('.password-error');

        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: 'asdfghjkl1234567890' } });
        wrapper.find('input[name="confirm_password"]').simulate('change', { target: { name: 'confirm_password', value: 'asdfghjkl' } });
        wrapper.find('input[type="submit"]').simulate('click');

        expect(child.text()).toContain("Passwords not matching");
    })
});
