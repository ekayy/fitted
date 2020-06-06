import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import Login from '../Login';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

// describe('Login', () => {
//   it('renders the correct message', () => {
//     const { queryByText } = render(<Login />);
//     expect(queryByText('Hello, world!')).not.toBeNull();
//   });

//   describe('rendering', () => {
//     let props: any;
//     beforeEach(() => {
//       props = createTestProps({});
//        wrapper = <Login {...props} />;
//     });

//     it('should render a <View />', () => {
//       expect(wrapper.find(View)).toHaveLength(1); // SUCCESS
//       expect(props.navigation.navigate).toHaveBeenCalledWith('LoginScreen'); // SUCCESS
//     });
//   });
// });

describe('Login', () => {
  let props: any;
  let wrapper;
  beforeEach(() => {
    props = createTestProps({});
    wrapper = <Login {...props} />;
  });

  describe('form', () => {
    it('can change username', () => {
      const { getByPlaceholder, getByText } = render(<Login {...props} />);

      fireEvent.changeText(getByPlaceholder('username'), 'Hello world');
      fireEvent.press(getByText('Login'));

      expect(getByPlaceholder('username').props.value).toEqual('Hello');
    });

    it('can change password', () => {});

    it('can display error if missing username', () => {});

    it('can display error if missing password', () => {});

    it('can display login correctly', () => {});

    it('cannot login if wrong credentials', () => {});
  });
});
