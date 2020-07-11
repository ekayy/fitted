import React from 'react';
import configureStore from '../Redux';
import Login from '../Containers/Login';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
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
    it('can change username', async () => {
      const { getByTestId } = render(wrapper);

      fireEvent.changeText(getByTestId('username'), 'Hello world');

      expect(getByTestId('username').props.value).toEqual('Hello world');
    });

    it('can change password', async () => {
      const { getByTestId } = render(wrapper);

      fireEvent.changeText(getByTestId('password'), 'Hello world');

      expect(getByTestId('password').props.value).toEqual('Hello world');
    });

    it('can display error if missing username', async () => {
      const { getByTestId, queryByTestId } = render(wrapper);
      fireEvent.changeText(getByTestId('password'), 'justpassword');

      fireEvent.press(getByTestId('login'));

      await waitFor(() => expect(queryByTestId('error')).toBeNull());
    });

    it('can display error if missing password', async () => {
      const { getByTestId, queryByTestId } = render(wrapper);
      fireEvent.changeText(getByTestId('username'), 'justusername');

      fireEvent.press(getByTestId('login'));

      await waitFor(() => expect(queryByTestId('error')).toBeNull());
    });

    it('cannot login if wrong credentials', async () => {
      const { getByTestId } = render(wrapper);

      fireEvent.changeText(getByTestId('username'), 'wronguser');
      fireEvent.changeText(getByTestId('password'), 'wrongpassword');

      fireEvent.press(getByTestId('login'));

      await waitFor(() => expect(getByTestId('error')).toBeTruthy());
    });

    // it('can login if correct credentials', async () => {
    //   const { getByTestId, queryByTestId } = render(wrapper);

    //   fireEvent.changeText(getByTestId('username'), 'fittedsf');
    //   fireEvent.changeText(getByTestId('password'), 'original');

    //   fireEvent.press(getByTestId('login'));

    //   await waitFor(() => expect(queryByTestId('login')).toBeNull());
    // });
  });
});
