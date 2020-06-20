import { createSelector } from 'reselect';
import { getUsers } from './messages.utils';

const getMessages = state => state.messages;

export const selectMessages = createSelector(
    [getMessages],
    messages => messages.messages
)

export const selectUsers = createSelector(
    [selectMessages],
    messages => getUsers(messages)
)