import axios from 'axios';

import { setAlert } from './alert';

import {
	CREATE_PROFILE_SUCCESS,
	CREATE_PROFILE_ERROR,
	GET_PROFILE_SUCCESS,
	GET_PROFILE_ERROR,
	GET_SEEKER_PROFILE_SUCCESS,
	GET_SEEKER_PROFILE_ERROR,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_ERROR,
	AUTH_SUCCESS
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

export const retrieveSeekerProfile = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);

		dispatch({ type: GET_SEEKER_PROFILE_SUCCESS, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: GET_SEEKER_PROFILE_ERROR });
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
			dispatch(setAlert(res.data.msg, res.data.type));
		} catch (err) {
			const errors = err.response.data.errors;

			console.log(err);
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'error'));
			});

			dispatch({ type: CREATE_PROFILE_ERROR });
		}
	};

export const updateProfile =
	({ name, username, bio }) =>
	async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = JSON.stringify({ name, username, bio });

		try {
			const res = await axios.put('/api/profile', body, config);

			dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
			dispatch(setAlert(res.data.msg, res.data.type));
		} catch (err) {
			const errors = err.response.data.errors;

			console.log(err);
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'error'));
			});

			dispatch({ type: UPDATE_PROFILE_ERROR });
		}
	};

export const followUser = (userId) => async (dispatch) => {
	try {
		const res = await axios.post(`/api/users/follow/${userId}`);

		dispatch({ type: AUTH_SUCCESS, payload: res.data });
		dispatch(retrieveSeekerProfile(userId));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const unfollowUser = (userId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/users/unfollow/${userId}`);

		dispatch({ type: AUTH_SUCCESS, payload: res.data });
		dispatch(retrieveSeekerProfile(userId));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const uploadProfileImage = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-type': 'multipart/formdata',
			'x-bucket-type': 'profile'
		}
	};

	const body = new FormData(formData);

	try {
		const res = await axios.put('/api/profile/image', body, config);

		dispatch(setAlert(res.data.msg, res.data.type));
		dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});
	}
};

export const removeProfileImage = () => async (dispatch) => {
	try {
		const res = await axios.delete('/api/profile/image');

		dispatch(setAlert(res.data.msg, res.data.type));
		dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
	} catch (err) {
		console.log(err.response.data.errors);
	}
};
