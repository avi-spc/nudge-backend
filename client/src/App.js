import { Provider } from 'react-redux';

import store from './reduxStore/store';

import Alert from './components/Alert';
import SignUp from './components/signUp/SignUp';

const App = () => {
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
