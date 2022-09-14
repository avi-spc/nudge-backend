import Navbar from './components/navbar/Navbar';
import ImageUpload from './components/post/createPost/ImageUpload';
import PublishPost from './components/post/createPost/PublishPost';
import FeedIndividualPost from './components/post/feed/FeedIndividualPost';
import IndividualPost from './components/post/individualPost/IndividualPost';
// import PostActions from './components/post/individualPost/PostActions';
import PostActions from './components/post/feed/PostActions';
import PostDetails from './components/post/individualPost/PostDetails';
import UserPostGallery from './components/profile/dashboard/UserPostGallery';
import UserProfile from './components/profile/dashboard/UserProfile';
import EditProfile from './components/profile/EditProfile';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';

const App = () => {
	return <div className="App">
		<FeedIndividualPost />
	</div>;
};

export default App;
