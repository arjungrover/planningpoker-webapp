import React from 'react';
import { mount } from 'enzyme';
import { CreatePokerBoardComponent } from './index';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const testStore = mockStore({
    issues: { issues: "", error: "" },
    createpb : { error: "" }
});

let onSubmitMock = jest.fn();
let getJiraMock = jest.fn();

const setUp = (props) => {
    return mount(
        <Provider store={testStore}>
            <BrowserRouter>
                <CreatePokerBoardComponent {...props} />
            </BrowserRouter>
        </Provider>
    )
};

describe('Testing CreatePokerBoard component', () => {

    let pokerboard = {
        name: "GameName",
        description: "Description",
        card_limit: "10",
        timer: "5",
        invite_email: [],
        card_set: "1",
        issues: []
    };

    const props = {
        createPokerBoard: onSubmitMock,
        getJiraIssues: getJiraMock
    };

    it('Testing if the action is being called and Should get proper arguments', () => {
        let wrapper = setUp(props);

        wrapper.update();

        wrapper.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'GameName' } });
        wrapper.find('input[name="description"]').simulate('change', { target: { name: 'description', value: 'Description' } });
        wrapper.find('input[name="cardSet"]').simulate('change', { target: { name: 'cardSet', value: 'Fibonacci' } });
        wrapper.find('input[name="range"]').simulate('change', { target: { name: 'range', value: '10' } });
        wrapper.find('input[name="timer"]').simulate('change', { target: { name: 'timer', value: '5' } });

        const button = wrapper.find('input[type="submit"]');

        button.simulate('click');
        expect(onSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock).toHaveBeenCalledWith(pokerboard);
    });

    it('Testing the name is not empty', () => {

        let wrapper = setUp(props);

        wrapper.update();

        wrapper.find('input[name="name"]').simulate('change', { target: { name: 'name', value: '' } });
        
        const button = wrapper.find('input[type="submit"]');

        button.simulate('click');
        expect(wrapper.find('.error-state').text()).toEqual("Enter Game Name !!");
        
    });

    it('Testing the description is not empty', () => {

        let wrapper = setUp(props);

        wrapper.update();

        wrapper.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'GameName' } });
        wrapper.find('input[name="description"]').simulate('change', { target: { name: 'description', value: '' } });
        
        const button = wrapper.find('input[type="submit"]');

        button.simulate('click');
        expect(wrapper.find('.error-state').text()).toEqual("Enter Description !!");
        
    });

    it('Testing if modal is opening', () => {

        let wrapper = setUp(props);

        wrapper.update();
        wrapper.find('.open-modal-text').simulate('click');
        
        expect(wrapper.find('.modal-field')).toHaveLength(1);
        
    });

});
