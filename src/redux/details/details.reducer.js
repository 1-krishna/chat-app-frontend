import DetailsActionTypes from "./details.types";

const INITIAL_STATE = {
    loggedUser: null,
    currentlyOpenUser: null
}

const detailsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DetailsActionTypes.SET_LOGGED_USER:
            return {
                ...state,
                loggedUser: action.payload
            }
        case DetailsActionTypes.SET_CURRENTLY_OPEN_USER:
            return {
                ...state,
                currentlyOpenUser: action.payload
            }
        default:
            return state;
    }
}

export default detailsReducer;