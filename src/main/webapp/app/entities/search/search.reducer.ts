import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
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

export type SearchState = Readonly<typeof initialState>;

// Reducer

export default (state: SearchState = initialState, action): SearchState => {
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
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/items';
const apiUrl2 = 'api/search';
// Actions

export const getEntities: ICrudGetAllAction<IItem> = (page, size, sort) => {
  const requestUrl = `${apiUrl2}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ITEM_LIST,
    payload: axios.get<IItem>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ITEM,
    payload: axios.get<IItem>(requestUrl)
  };
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
