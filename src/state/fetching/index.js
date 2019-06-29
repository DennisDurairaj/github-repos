const FETCH_BEGIN = 'repos/FETCH_BEGIN';
const FETCH_SUCCESS = 'repos/FETCH_SUCCESS';
const FETCH_FAILED = 'repos/FETCH_FAILED';

const initialState = {
  isFetching: false,
  error: null
};

export const fetchBegin = () => {
  return {
    type: FETCH_BEGIN
  };
};

export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS
  };
};

export const fetchFailed = error => {
  return {
    type: FETCH_FAILED,
    payload: {
      isFetching: false,
      error
    }
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BEGIN:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};
