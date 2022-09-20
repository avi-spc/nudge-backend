import axios from 'axios';

import { setAlert } from './alert';

import {
	GET_ALL_POSTS,
	GET_INDIVIDUAL_POST_SUCCESS,
	GET_INDIVIDUAL_POST_ERROR,
	UPDATE_COMMENTS,
	UPDATE_LIKES,
	UPDATE_SAVED_POSTS
} from './types';

export const retrieveAllPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/posts');

		dispatch({ type: GET_ALL_POSTS, payload: res.data });
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const retrieveIndividualPost = (postId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${postId}`);

		dispatch({ type: GET_INDIVIDUAL_POST_SUCCESS, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: GET_INDIVIDUAL_POST_ERROR });
	}
};

export const likePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.post(`/api/posts/like/${postId}`);

		dispatch(retrieveIndividualPost(postId));
		dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data.likes } });
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const unlikePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/posts/unlike/${postId}`);

		dispatch(retrieveIndividualPost(postId));
		dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data.likes } });
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const savePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.post(`/api/posts/save/${postId}`);

		dispatch({ type: UPDATE_SAVED_POSTS, payload: res.data });
		dispatch(setAlert(res.data.msg, res.data.type));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const unsavePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/posts/unsave/${postId}`);

		dispatch({ type: UPDATE_SAVED_POSTS, payload: res.data });
		dispatch(setAlert(res.data.msg, res.data.type));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const addComment = (comment, postId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ comment });

	try {
		const res = await axios.post(`/api/posts/comment/${postId}`, body, config);

		dispatch(retrieveIndividualPost(postId));
		dispatch({
			type: UPDATE_COMMENTS,
			payload: { postId, comments: res.data.comments }
		});
	} catch (err) {
		console.log(err.response.data.errors);
	}
};
