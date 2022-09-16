import { useEffect } from 'react';
import { Provider } from 'react-redux';

import store from './reduxStore/store';

import Alert from './components/Alert';
import LogIn from './components/logIn/LogIn';
import SignUp from './components/signUp/SignUp';

import { retrieveUser } from './reduxStore/actions/auth';

const App = () => {
	useEffect(() => {
		store.dispatch(retrieveUser());
	}, []);

	return (
		<div className="App">
			<Provider store={store}>
				<Alert />
				<LogIn />
			</Provider>
		</div>
	);
};

export default App;
