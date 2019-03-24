import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Welcome from '../index';

const props = {

    navigation: {

        navigate: jest.fn(),
        dispatch: jest.fn()

    }

};

it('The default state is correctly', () => {
    const wrapper = shallow(<Welcome {...props} />);

    expect(wrapper.state().username).toBeDefined();
    expect(wrapper.state().loading).toBeDefined();
    expect(wrapper.state().errorMessage).toBeDefined();

  });

  it('saveUser is called', () => {
    const wrapper = shallow(<Welcome {...props} />);

    const spy = jest.spyOn(wrapper.instance(), 'saveUser');

    wrapper.update();
    wrapper.instance().saveUser();

    expect(spy).toHaveBeenCalled();
  });

  it('signIn is called', () => {
    const wrapper = shallow(<Welcome {...props} />);

    const spy = jest.spyOn(wrapper.instance(), 'signIn');

    wrapper.update();
    wrapper.instance().signIn();

    expect(spy).toHaveBeenCalled();
  });

  it('signIn was called when button click', () => {
    const spy = jest.spyOn(Welcome.prototype, 'signIn');

    const wrapper = shallow(<Welcome {...props} />);

    wrapper.setState({ loading: false })
    
    wrapper.update();

    // wrapper.find('TouchableOpacity').simulate('click');

    const nextButton = wrapper.find('TouchableOpacity').first();

    // Enzyme usually allows wrapper.simulate() alternatively, but this doesn't support 'press' events.
    nextButton.props().onPress();

    expect(spy).toHaveBeenCalled();

  });

  it('saveUser is called in signIn', () => {
    const wrapper = shallow(<Welcome {...props} />);

    wrapper.setState({ username: 'asassasdds' })

    const spy = jest.spyOn(wrapper.instance(), 'saveUser');

    wrapper.update();

    wrapper.instance().saveUser()

    expect(spy).toHaveBeenCalled();

  });

it('renders correctly', () => {
    const wrapper = shallow(<Welcome {...props} />);
    
    expect(wrapper).toMatchSnapshot()
});