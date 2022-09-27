import {
	GET_ALL_POSTS,
	GET_INDIVIDUAL_POST_ERROR,
	GET_INDIVIDUAL_POST_SUCCESS,
	POST_IMAGE_UPLOAD_SUCCESS,
	POST_UPLOAD_SUCCESS,
	POST_UPLOAD_ERROR,
	UPDATE_COMMENTS,
	UPDATE_LIKES
} from '../actions/types';

const initialState = {
	posts: [],
	individualPost: null,
	newPostImageId: null
};

const postReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_POSTS:
			return { ...state, posts: payload.posts };
		case GET_INDIVIDUAL_POST_SUCCESS:
			return { ...state, individualPost: payload.post };
		case GET_INDIVIDUAL_POST_ERROR:
			return { ...state, individualPost: null };
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId ? { ...post, likes: payload.likes } : post
				)
			};
		case UPDATE_COMMENTS:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId ? { ...post, comments: payload.comments } : post
				)
			};
		case POST_IMAGE_UPLOAD_SUCCESS:
			return { ...state, newPostImageId: payload.imageId };
		case POST_UPLOAD_ERROR:
		case POST_UPLOAD_SUCCESS:
			return { ...state, newPostImageId: null };
		default:
			return state;
	}
};

export default postReducer;
