import { useEffect } from 'react';
import { Provider } from 'react-redux';

import store from './reduxStore/store';

import Alert from './components/Alert';
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
				<SignUp />
			</Provider>
		</div>
	);
};

export default App;
