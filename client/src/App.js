import ImageUpload from './components/post/createPost/ImageUpload';
import PublishPost from './components/post/createPost/PublishPost';
import IndividualPost from './components/post/individualPost/IndividualPost';
import PostDetails from './components/post/individualPost/PostDetails';
import UserPostGallery from './components/profile/dashboard/UserPostGallery';
import UserProfile from './components/profile/dashboard/UserProfile';
import EditProfile from './components/profile/EditProfile';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';

const App = () => {
	return (
		<div className="App">
			<PostDetails />
		</div>
	);
};

export default App;
