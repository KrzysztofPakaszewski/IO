import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMatching, defaultValue } from 'app/shared/model/matching.model';

export const ACTION_TYPES = {
  FETCH_MATCHING_LIST: 'matching/FETCH_MATCHING_LIST',
  FETCH_MATCHING: 'matching/FETCH_MATCHING',
  CREATE_MATCHING: 'matching/CREATE_MATCHING',
  UPDATE_MATCHING: 'matching/UPDATE_MATCHING',
  DELETE_MATCHING: 'matching/DELETE_MATCHING',
  RESET: 'matching/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMatching>,
  chat: [] as ReadonlyArray<any>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MatchingState = Readonly<typeof initialState>;

// Reducer

export default (state: MatchingState = initialState, action): MatchingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MATCHING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MATCHING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MATCHING):
    case REQUEST(ACTION_TYPES.UPDATE_MATCHING):
    case REQUEST(ACTION_TYPES.DELETE_MATCHING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MATCHING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MATCHING):
    case FAILURE(ACTION_TYPES.CREATE_MATCHING):
    case FAILURE(ACTION_TYPES.UPDATE_MATCHING):
    case FAILURE(ACTION_TYPES.DELETE_MATCHING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATCHING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATCHING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MATCHING):
    case SUCCESS(ACTION_TYPES.UPDATE_MATCHING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MATCHING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/matchings';

// Actions

export const getEntities: ICrudGetAllAction<IMatching> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/loggedUser`;
  return {
    type: ACTION_TYPES.FETCH_MATCHING_LIST,
    payload: axios.get<IMatching>(`${requestUrl}?cacheBuster=${new Date().getTime()}`)
  };
};

export const getLoggedUserMatches = () => {
  const requestUrl = `${apiUrl}/loggedUser`;
  return {
    type: ACTION_TYPES.FETCH_MATCHING_LIST,
    payload: axios.get<IMatching>(requestUrl)
  };
};

export const getEntity: ICrudGetAction<IMatching> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MATCHING,
    payload: axios.get<IMatching>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMatching> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MATCHING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMatching> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MATCHING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const acceptMatching: ICrudPutAction<IMatching> = entity => async dispatch => {
  const requestUrl = `${apiUrl}/accept`;
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MATCHING,
    payload: axios.post(requestUrl, cleanEntity(entity))
  });
  dispatch(getLoggedUserMatches());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMatching> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MATCHING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getLoggedUserMatches());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
