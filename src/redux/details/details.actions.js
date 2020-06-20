import DetailsActionTypes from "./details.types";

export const setCurrentlyOpenUser = user => ({
    type: DetailsActionTypes.SET_CURRENTLY_OPEN_USER,
    payload: user
});

export const setLoggedUser = user => ({
    type: DetailsActionTypes.SET_LOGGED_USER,
    payload: user
});