import axios from 'axios';

import { setAlert } from './alert';

import {
	CREATE_PROFILE_SUCCESS,
	CREATE_PROFILE_ERROR,
	GET_PROFILE_SUCCESS,
	GET_PROFILE_ERROR
} from './types';

export const retrieveCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('api/profile/me');

		dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: GET_PROFILE_ERROR });
	}
};

export const createProfile =
	({ name, username }) =>
	async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = JSON.stringify({ name, username });

		try {
			const res = await axios.post('/api/profile', body, config);

			dispatch({ type: CREATE_PROFILE_SUCCESS, payload: res.data });
		} catch (err) {
			const errors = err.response.data.errors;

			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'error'));
			});

			dispatch({ type: CREATE_PROFILE_ERROR });
		}
	};
