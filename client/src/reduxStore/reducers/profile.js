import {
	CREATE_PROFILE_SUCCESS,
	CREATE_PROFILE_ERROR,
	GET_PROFILE_SUCCESS,
	GET_PROFILE_ERROR,
	CLEAR_PROFILE,
	GET_SEEKER_PROFILE_SUCCESS,
	GET_SEEKER_PROFILE_ERROR,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_ERROR
} from '../actions/types';

const initialState = {
	personalProfile: null,
	userProfile: null,
	userProfileFollows: null
};

const profileReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case CREATE_PROFILE_SUCCESS:
		case GET_PROFILE_SUCCESS:
		case UPDATE_PROFILE_SUCCESS:
			return { ...state, personalProfile: payload.profile };
		case GET_SEEKER_PROFILE_SUCCESS:
			return { ...state, userProfile: payload.profile, userProfileFollows: payload.follows };
		case CREATE_PROFILE_ERROR:
		case GET_PROFILE_ERROR:
		case CLEAR_PROFILE:
			return { ...state, personalProfile: null, userProfile: null };
		case GET_SEEKER_PROFILE_ERROR:
			return { ...state, userProfile: null };
		case UPDATE_PROFILE_ERROR:
		default:
			return state;
	}
};

export default profileReducer;
