import { initialState } from './global-store';

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                user: action.payload
            };
        case 'SIGN_OUT':
            return {
                ...initialState
            };
        case 'GET_STORES':
            return {
                ...state,
                stores: action.payload
            };
        case 'CREATE_STORE':
            return {
                ...state,
                stores: state.stores.push(action.payload)
            };
        case 'UPDATE_STORE':
            return {
                ...state,
                stores: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;