import { REGISTER_SUCCESS, REGISTER_ERROR } from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, token: payload.token, isAuthenticated: true };
		case REGISTER_ERROR:
			return { ...state, token: null, isAuthenticated: false };
		default:
			return state;
	}
};

export default authReducer;
