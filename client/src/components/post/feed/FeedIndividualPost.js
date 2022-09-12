import UserHeaderBar from '../headerBars/UserHeaderBar';
import PostActions from './PostActions';
import PostDetails from './PostDetails';
import PostVisual from './PostVisual';

const FeedIndividualPost = () => {
	return (
		<div>
			<UserHeaderBar />
			<PostVisual />
			<PostActions />
			<PostDetails />
		</div>
	);
};

export default FeedIndividualPost;
