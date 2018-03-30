import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR,
    START_TIMEOUT,
    STEP_TIMEOUT
} from '../actions/types';
  
const INITIAL_STATE = {
    data: {
        rows: [],
        loading: false,
        error: ''
    },
    timeout: 15
};
  
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_DATA:
            return { ...state, timeout: 15, data: { ...state.data, loading: true, error: '' } };

        case GET_DATA_SUCCESS:
            return { ...state, timeout: 15, data: { ...state.data, loading: false, error: '', rows: [ ...action.payload ] } };

        case  GET_DATA_ERROR:
            return { ...state, timeout: 15, data: { rows: [], loading: false, error: 'ERROR LOADING DATA' } };
        
        case START_TIMEOUT:
            return { ...state, timeout: 15 };

        case STEP_TIMEOUT:
            return { ...state, timeout: state.timeout - 1 };    

        default:
            return state;
            
    }
};
  