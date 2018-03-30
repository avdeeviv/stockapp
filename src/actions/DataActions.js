import axios from 'axios';
import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    START_TIMEOUT,
    STEP_TIMEOUT
} from './types';


export const getData = () => {
    return (dispatch) => {
        dispatch({ type: GET_DATA });
        axios.defaults.headers.common = {};
        axios.get('http://phisix-api3.appspot.com/stocks.json', { header: { "Accept": 'application/json' } })
            .then(response => {
                if (response.status == 200) {
                    getDataSuccess(dispatch, response.data);
                } else {
                    getDataFail(dispatch, error);
                }
            })
            .catch(error => {
                getDataFail(dispatch, error);
            });
    };
};

const getDataSuccess = (dispatch, data) => {
    dispatch(
        {
            type: GET_DATA_SUCCESS,
            payload: data.stock
        }
   );
};

const getDataFail = (dispatch) => {
    dispatch(
        { 
            type: GET_DATA_FAIL 
        }
    );
};

export const startTimeout = () => {
    return {
        type: START_TIMEOUT
    };
};

export const stepTimeout = () => {
    return {
        type: STEP_TIMEOUT
    };
};

