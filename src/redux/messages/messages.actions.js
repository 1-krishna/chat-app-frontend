import MessagesActionTypes from "./messages.types";

export const setMessages = messages => ({
    type: MessagesActionTypes.SET_MESSAGES,
    payload: messages
});

export const addMessage = message => ({
    type: MessagesActionTypes.ADD_MESSAGE,
    payload: message
});