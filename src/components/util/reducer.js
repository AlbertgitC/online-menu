import { storeInitialState } from './global-store';

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                user: action.payload
            };
        case 'SIGN_OUT':
            return {
                user: null
            };
        case 'SET_STORES':
            return {
                ...state,
                stores: action.payload
            };
        case 'CLEAR_STORE':
            return {
                ...storeInitialState
            };
        case 'GET_LOCATIONS':
            return {
                ...state,
                locations: action.payload
            };
        case 'CREATE_LOCATION':
            return {
                ...state,
                locations: action.payload
            };
        case 'UPDATE_LOCATION':
            return {
                ...state,
                locations: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;