import axios from 'axios';

import { setAuthToken } from '../utils/setAuthToken';
import { setAlert } from './alert';

import { REGISTER_SUCCESS, REGISTER_ERROR, AUTH_SUCCESS, AUTH_ERROR } from './types';

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

export const registerUser =
	({ email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = JSON.stringify({ email, password });

		try {
			const res = await axios.post('/api/users/', body, config);

			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		} catch (err) {
			const errors = err.response.data.errors;

			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'error'));
			});

			dispatch({ type: REGISTER_ERROR });
		}
	};
