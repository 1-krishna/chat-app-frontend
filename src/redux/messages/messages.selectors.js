import { createSelector } from 'reselect';

const getMessages = state => state.messages;

export const selectMessages = createSelector(
    [getMessages],
    messages => messages.messages
)
