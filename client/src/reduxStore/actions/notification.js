import axios from 'axios';

import { GET_NOTIFICATIONS } from './types';

export const getNotifications = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/notifications');
		
		dispatch({ type: GET_NOTIFICATIONS, payload: res.data });
	} catch (err) {
		console.log(err.response.data.errors);
	}
};
