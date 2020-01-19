import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IItem, defaultValue } from 'app/shared/model/item.model';

export const ACTION_TYPES = {
  FETCH_ITEM_LIST: 'swipe/FETCH_ITEM_LIST',
  SET_BLOB: 'swipe/SET_BLOB',
  CREATE_MATCHING: 'matching/CREATE_MATCHING',
  RESET: 'swipe/RESET'
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
    case FAILURE(ACTION_TYPES.FETCH_ITEM_LIST):
    case SUCCESS(ACTION_TYPES.FETCH_ITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions

export const getRecommendedItems = () => {
  const requestUrl = 'api/items/recommended';
  return {
    type: ACTION_TYPES.FETCH_ITEM_LIST,
    payload: axios.get<IItem>(requestUrl)
  };
};

export const createMatching = (userItem, recommendedItem) => {
  const requestUrl = 'api/matchings/addFromSwipe';
  return {
    type: ACTION_TYPES.CREATE_MATCHING,
    payload: axios.put(requestUrl, [userItem, recommendedItem])
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
