import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IItem, defaultValue } from 'app/shared/model/item.model';

export const ACTION_TYPES = {
  FETCH_ITEM_LIST: 'item/FETCH_ITEM_LIST',
  FETCH_ITEM: 'item/FETCH_ITEM',
  SET_BLOB: 'item/SET_BLOB',
  RESET: 'item/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IItem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0
};

export type SwipeState = Readonly<typeof initialState>;

// Reducer

export default (state: SwipeState = initialState, action): SwipeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ITEM_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case REQUEST(ACTION_TYPES.FETCH_ITEM):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ITEM):
    case SUCCESS(ACTION_TYPES.FETCH_ITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/swipe';
// Actions

export const getRecommendedItems = () => {
  const requestUrl = apiUrl;
  return {
    type: ACTION_TYPES.FETCH_ITEM_LIST,
    payload: axios.get<IItem>(requestUrl)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
