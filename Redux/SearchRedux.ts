import axios from 'axios';
import { baseURL } from '../Config';
import { SearchActionTypes, AppThunk, SearchState, Search } from '../types';

// Actions
export const SEARCH_GARMENTS_BEGIN = 'SEARCH_GARMENTS_BEGIN';
export const SEARCH_GARMENTS_SUCCESS = 'SEARCH_GARMENTS_SUCCESS';
export const SEARCH_GARMENTS_FAILURE = 'SEARCH_GARMENTS_FAILURE';

export const SET_BRAND_FILTER = 'SET_BRAND_FILTER';

export const CLEAR_SEARCH_FILTERS = 'CLEAR_SEARCH_FILTERS';

export const CLEAR = 'CLEAR';

export const INITIAL_STATE: SearchState = {
  items: [],
  loading: false,
  error: null,
  brandIds: [],
};

// Reducer
export default function search(state = INITIAL_STATE, action: SearchActionTypes): SearchState {
  switch (action.type) {
    case SEARCH_GARMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_GARMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...action.payload],
      };

    case SEARCH_GARMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case SET_BRAND_FILTER: {
      const brandIds =
        state.brandIds.indexOf(action.payload) === -1
          ? [...state.brandIds, action.payload]
          : state.brandIds.filter((id) => id !== action.payload);

      return {
        ...state,
        brandIds,
      };
    }

    case CLEAR_SEARCH_FILTERS:
      return {
        ...state,
        brandIds: [],
      };

    case CLEAR:
      return INITIAL_STATE;

    default:
      return state;
  }
}

// Action Creators
export const searchGarmentsBegin = (): SearchActionTypes => ({
  type: SEARCH_GARMENTS_BEGIN,
});
export const searchGarmentsSuccess = (items: Search[]): SearchActionTypes => ({
  type: SEARCH_GARMENTS_SUCCESS,
  payload: items,
});
export const searchGarmentsFailure = ({
  error,
}: Pick<SearchState, 'error'>): SearchActionTypes => ({
  type: SEARCH_GARMENTS_FAILURE,
  payload: { error },
});

export const setBrandFilter = (brandId: number): SearchActionTypes => ({
  type: SET_BRAND_FILTER,
  payload: brandId,
});
export const clearSearchFilters = (): SearchActionTypes => ({
  type: CLEAR_SEARCH_FILTERS,
});

// side effects, only as applicable
// e.g. thunks, epics, etc

export const searchGarments = ({
  searchTerm,
  brandIds,
  sortBy,
  offset = 0,
}: {
  searchTerm: string;
  brandIds: number[];
  sortBy?: string;
  offset?: number;
}): AppThunk => async (dispatch) => {
  dispatch(searchGarmentsBegin());
  try {
    const res = await axios.get(`${baseURL}/garments/`, {
      params: {
        search: searchTerm,
        brand: brandIds.join(','),
        limit: 20,
        ordering: sortBy,
      },
    });
    dispatch(searchGarmentsSuccess(res.data.results));
  } catch (error) {
    dispatch(searchGarmentsFailure(error));
  }
};

// Selectors
// const searchSelector = (state) => state.search.items;

// export const searchByMostRecentSelector = createSelector(searchSelector, (items) =>
//   items.sort((a, b) => (b.created_date - a.created_date ? 1 : -1)),
// );
// export const searchByMostFavoritedSelector = createSelector(searchSelector, (items) =>
//   items.sort((a, b) => (b.favorited_by.length < a.favorited_by.length ? 1 : -1)),
// );
