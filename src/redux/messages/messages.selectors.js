import { createSelector } from 'reselect';
import { getUsers, getOpenUserMessages } from './messages.utils';

const getMessages = state => state.messages;

export const selectMessages = createSelector(
    [getMessages],
    messages => messages.messages
)

export const selectUsers = createSelector(
    [selectMessages],
    messages => getUsers(messages)
)

export const selectOpenUserMessages = user => createSelector(
    [selectMessages],
    messages => getOpenUserMessages(messages, user)
)