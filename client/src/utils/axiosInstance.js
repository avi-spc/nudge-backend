import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://nudge.vercel.app'
});

export default instance;
