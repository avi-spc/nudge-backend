import PostActions from './PostActions';
import PostDetails from './PostDetails';
import PostVisual from './PostVisual';

const FeedIndividualPost = () => {
	return (
		<div className="feed-individual-post">
			<PostVisual />
			<PostActions />
			<PostDetails />
		</div>
	);
};

export default FeedIndividualPost;
