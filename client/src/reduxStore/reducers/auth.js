import {
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	AUTH_SUCCESS,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGOUT
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case AUTH_SUCCESS:
			return { ...state, isAuthenticated: true, user: payload.user };
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, token: payload.token, isAuthenticated: true };
		case REGISTER_ERROR:
		case AUTH_ERROR:
		case LOGIN_ERROR:
		case LOGOUT:
			localStorage.removeItem('token');
			return { ...state, token: null, isAuthenticated: false, user: null };
		default:
			return state;
	}
};

export default authReducer;
