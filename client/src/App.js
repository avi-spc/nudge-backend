import ImageUpload from './components/post/createPost/ImageUpload';
import PublishPost from './components/post/createPost/PublishPost';
import UserPostGallery from './components/profile/dashboard/UserPostGallery';
import UserProfile from './components/profile/dashboard/UserProfile';
import EditProfile from './components/profile/EditProfile';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';

const App = () => {
	return (
		<div className="App">
			<UserPostGallery />
		</div>
	);
};

export default App;
