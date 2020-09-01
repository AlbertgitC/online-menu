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
        case 'SET_LOCATIONS':
            return {
                ...state,
                locations: action.payload
            };
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;