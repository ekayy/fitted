import React from 'react';
import configureStore from '../Redux';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-native-testing-library';
import CreateDiscussion from '../Containers/CreateDiscussion';

jest.useFakeTimers();

const createTestProps = () => ({
  route: {},
  navigation: { navigate: jest.fn() },
});

describe('CreateDiscussion', () => {
  let props: any;
  let wrapper;
  const initialState = { brands: { items: [{ id: 1, name: 'test' }] }, user: { profileId: 56 } };

  beforeEach(() => {
    props = createTestProps();
    const { store } = configureStore(initialState);
    wrapper = (
      <Provider store={store}>
        <CreateDiscussion {...props} />
      </Provider>
    );
  });

  it('input text can be changed', () => {
    const { getByTestId } = render(wrapper);

    fireEvent.changeText(getByTestId('brand'), 'Hello world');
    fireEvent.changeText(getByTestId('model'), 'Hello world');
    fireEvent.changeText(getByTestId('color'), 'Hello world');
    fireEvent.changeText(getByTestId('type'), 'Hello world');

    expect(getByTestId('brand').props.values['brand']).toBe('Hello world');
    expect(getByTestId('model').props.values['model']).toBe('Hello world');
    expect(getByTestId('color').props.values['color']).toBe('Hello world');
    expect(getByTestId('type').props.values['model']).toBe('Hello world');
  });

  // it('cannot submit form if some fields missing', async () => {
  //   const { getByTestId, queryByTestId } = render(wrapper);

  //   fireEvent.changeText(getByTestId('model'), 'Hello world');
  //   fireEvent.press(getByTestId('submit'));

  //   await waitFor(() => expect(queryByTestId('error')).toBeTruthy());
  // });

  // it('can submit form if all fields filled out', async () => {
  //   const { getByTestId, queryByTestId } = render(wrapper);

  //   fireEvent.changeText(getByTestId('brand'), 'Hello world');
  //   fireEvent.changeText(getByTestId('model'), 'Hello world');
  //   fireEvent.changeText(getByTestId('color'), 'Hello world');
  //   fireEvent.changeText(getByTestId('type'), 'Hello world');
  //   fireEvent.press(getByTestId('submit'));

  //   await waitFor(() => expect(queryByTestId('submit')).toBeTruthy());
  // });
});
