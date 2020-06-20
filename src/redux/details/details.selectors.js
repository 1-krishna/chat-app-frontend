import { createSelector } from 'reselect';

const getDetails = state => state.details;

export const selectLoggedUser = createSelector(
    [getDetails],
    details => details.loggedUser
)

export const selectCurrentlyOpenUser = createSelector(
    [getDetails],
    details => details.currentlyOpenUser
)
