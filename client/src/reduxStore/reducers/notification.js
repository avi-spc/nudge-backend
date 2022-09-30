import { GET_NOTIFICATIONS } from '../actions/types';

const initialState = [];

const notificationReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_NOTIFICATIONS:
			return payload.notifications;
		default:
			return state;
	}
};

export default notificationReducer;
