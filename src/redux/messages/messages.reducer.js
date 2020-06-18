import MessagesActionTypes from "./messages.types";

const INITIAL_STATE = {
    messages: null
}

const messagesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MessagesActionTypes.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
    }
}

export default messagesReducer;