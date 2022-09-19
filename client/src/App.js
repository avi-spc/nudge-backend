import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './reduxStore/store';

import Alert from './components/Alert';
import LogIn from './components/logIn/LogIn';
import SignUp from './components/signUp/SignUp';
import PostFeed from './components/post/feed/PostFeed';
import UserProfile from './components/profile/dashboard/UserProfile';
import Follows from './components/profile/dashboard/Follows';
import UpdateProfile from './components/profile/UpdateProfile';
import PrivateRoute from './components/PrivateRoute';

import { retrieveUser } from './reduxStore/actions/auth';
import { retrieveCurrentProfile } from './reduxStore/actions/profile';
import { setAuthToken } from './reduxStore/utils/setAuthToken';

// if (localStorage.token) {
// 	setAuthToken(localStorage.token);
// }

const App = () => {
	useEffect(() => {
		store.dispatch(retrieveUser());
		store.dispatch(retrieveCurrentProfile());
	}, []);

	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Alert />
					<Routes>
						{console.log('changed')}
						<Route path="/" element={<LogIn />} />
						<Route path="/register" element={<SignUp />} />
						<Route path="/" element={<PrivateRoute />}>
							<Route path="feed" element={<PostFeed />} />
							<Route path="profile/:user_id/" element={<UserProfile />}>
								{['followers', 'following'].map((path, index) => {
									return <Route path={path} element={<Follows />} key={index} />;
								})}
							</Route>
							<Route path="profile/edit" element={<UpdateProfile />} />
						</Route>
					</Routes>
				</Router>
			</Provider>
		</div>
	);
};

export default App;
