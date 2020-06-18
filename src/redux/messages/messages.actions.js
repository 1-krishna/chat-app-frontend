import MessagesActionTypes from "./messages.types";

export const setMessages = message => ({
    type: MessagesActionTypes.SET_MESSAGES,
    payload: message
});