import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import '@testing-library/react-native/cleanup-after-each';
// import { fireEvent, render } from './test-utils';
import CreateDiscussion from '../Containers/CreateDiscussion';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const createTestProps = () => ({
  route: {},
  navigation: { navigate: jest.fn() },
});

describe('CreateDiscussion', () => {
  let props: any;
  let store, wrapper;
  const initialState = { brands: { items: [{ id: 1, name: 'test' }] }, user: {} };
  const mockStore = configureStore();

  beforeEach(() => {
    props = createTestProps();
    store = mockStore(initialState);
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

    // console.log(getByTestId('model').props.values['model']);

    expect(getByTestId('brand').props.values['brand']).toBe('Hello world');
    expect(getByTestId('model').props.values['model']).toBe('Hello world');
    expect(getByTestId('color').props.values['color']).toBe('Hello world');
    expect(getByTestId('type').props.values['model']).toBe('Hello world');
  });

  it('cannot submit form if some fields missing', async () => {
    const { getByTestId, queryByTestId } = render(wrapper);

    fireEvent.changeText(getByTestId('brand'), 'Hello world');
    fireEvent.press(getByTestId('submit'));

    await wait(() => expect(queryByTestId('submit')).toBeTruthy());
  });

  it('can submit form if all fields filled out', async () => {
    const { getByTestId, queryByTestId } = render(wrapper);

    fireEvent.changeText(getByTestId('brand'), 'Hello world');
    fireEvent.changeText(getByTestId('model'), 'Hello world');
    fireEvent.changeText(getByTestId('color'), 'Hello world');
    fireEvent.changeText(getByTestId('type'), 'Hello world');
    fireEvent.press(getByTestId('submit'));

    await wait(() => expect(queryByTestId('submit')).toBeTruthy());
  });
});
