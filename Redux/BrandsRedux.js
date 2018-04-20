// Actions
const FETCH = 'brands/FETCH';
const SUCCESS = 'brands/SUCCESS';
const FAIL = 'brands/FAIL';

export const INITIAL_STATE = {
  results: null,
  error: null,
  fetching: false
};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default:
      return state;
  }
}

// Action Creators
export function loadWidgets() {
  return { type: LOAD };
}

export function createWidget(widget) {
  return { type: CREATE, widget };
}

// side effects, only as applicable
// e.g. thunks, epics, etc
export function getBrands() {
  return dispatch =>
    get('/garments').then(garment => dispatch(updateWidget(garment)));
}
