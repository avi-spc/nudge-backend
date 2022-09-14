import LogIn from './components/logIn/LogIn';
import Navbar from './components/navbar/Navbar';
import ImageUpload from './components/post/createPost/ImageUpload';
import FeedIndividualPost from './components/post/feed/FeedIndividualPost';
import PostFeed from './components/post/feed/PostFeed';
import IndividualPost from './components/post/individualPost/IndividualPost';
import UserProfile from './components/profile/dashboard/UserProfile';
import UpdateProfile from './components/profile/UpdateProfile';
import SignUp from './components/signUp/SignUp';

const App = () => {
	return (
		<div className="App">
			<Navbar />
			<PostFeed />
		</div>
	);
};

export default App;
