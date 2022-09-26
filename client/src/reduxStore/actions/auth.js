import axios from 'axios';

import { setAuthToken } from '../utils/setAuthToken';
import { setAlert } from './alert';
import { getPersonalProfile } from './profile';

import {
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	AUTH_SUCCESS,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGOUT,
	CLEAR_PROFILE,
	GET_SAVED_POSTS
} from './types';

export const retrieveUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');

		dispatch({ type: AUTH_SUCCESS, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: AUTH_ERROR });
	}
};

export const register = (user) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(user);

	try {
		const res = await axios.post('/api/users/', body, config);

		dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		dispatch(retrieveUser());
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: REGISTER_ERROR });
	}
};

export const login = (user) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(user);

	try {
		const res = await axios.post('/api/auth', body, config);

		dispatch({ type: LOGIN_SUCCESS, payload: res.data });
		dispatch(retrieveUser());
		dispatch(getPersonalProfile());
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: LOGIN_ERROR });
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};

export const retrieveSavedPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/users/savedPosts');

		dispatch({ type: GET_SAVED_POSTS, payload: res.data });
	} catch (err) {
		console.log(err.response.data.errors);
	}
};
