import {
	CREATE_PROFILE_SUCCESS,
	CREATE_PROFILE_ERROR,
	GET_PROFILE_SUCCESS,
	GET_PROFILE_ERROR,
	CLEAR_PROFILE
} from '../actions/types';

const initialState = {
	profileSelf: null
};

const profileReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case CREATE_PROFILE_SUCCESS:
		case GET_PROFILE_SUCCESS:
			return { ...state, profileSelf: payload.profile };
		case CREATE_PROFILE_ERROR:
		case GET_PROFILE_ERROR:
		case CLEAR_PROFILE:
			return { ...state, profileSelf: null };
		default:
			return state;
	}
};

export default profileReducer;
