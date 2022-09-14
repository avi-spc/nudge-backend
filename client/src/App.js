import LogIn from './components/logIn/LogIn';
import ImageUpload from './components/post/createPost/ImageUpload';
import IndividualPost from './components/post/individualPost/IndividualPost';
import UserProfile from './components/profile/dashboard/UserProfile';
import UpdateProfile from './components/profile/UpdateProfile';
import SignUp from './components/signUp/SignUp';

const App = () => {
	return (
		<div className="App">
			<IndividualPost />
		</div>
	);
};

export default App;
