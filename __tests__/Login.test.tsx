import React from 'react';
// import configureStore from 'redux-mock-store';
import configureStore from '../Redux';
import Login from '../Containers/Login';
// import { fireEvent, render, wait } from '@testing-library/react-native';
// import '@testing-library/jest-native/extend-expect';
// import '@testing-library/react-native/cleanup-after-each';
// import { fireEvent, render } from './test-utils';
// import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent, waitFor, act } from 'react-native-testing-library';
// import { RootNav } from '../Navigation/RootNav';
import { Provider } from 'react-redux';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const createTestProps = () => ({
  route: {},
  navigation: { navigate: jest.fn() },
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
  const initialState = { user: { profileId: 56, error: false, loading: false } };

  beforeEach(() => {
    props = createTestProps();
    const { store } = configureStore(initialState);
    wrapper = (
      <Provider store={store}>
        <Login {...props} />
      </Provider>
    );
  });

  describe('form', () => {
    // const component = (
    //   <NavigationContainer>
    //     <RootNav />
    //   </NavigationContainer>
    // );

    it('can change username', async () => {
      const { getByTestId } = render(wrapper);

      await act(async () => {
        fireEvent.changeText(getByTestId('username'), 'Hello world');
      });
      // fireEvent.press(getByText('Login'));

      expect(getByTestId('username').props.value).toEqual('Hello world');
    });

    it.skip('can change password', () => {
      const { getByTestId } = render(wrapper);

      fireEvent.changeText(getByTestId('password'), 'Hello world');

      expect(getByTestId('password').props.value).toEqual('Hello');
    });

    it('can display error if missing username', () => {});

    it('can display error if missing password', () => {});

    it('can display login correctly', () => {});

    it('cannot login if wrong credentials', () => {});

    it.skip('can login if correct credentials', async () => {
      const { getByTestId, getByPlaceholder } = render(wrapper);

      fireEvent.changeText(getByTestId('username'), 'fittedsf');
      fireEvent.changeText(getByTestId('password'), 'original');

      fireEvent.press(getByTestId('login'));

      await waitFor(() => expect(getByPlaceholder('Search')).toBeTruthy());
    });
  });
});
