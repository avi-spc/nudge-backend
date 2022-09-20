import PostActions from './PostActions';
import PostDetails from './PostDetails';
import PostVisual from './PostVisual';

const FeedIndividualPost = ({ post }) => {
	return (
		<div className="feed-individual-post">
			<PostVisual />
			<PostActions post={post} />
			<PostDetails post={post} />
		</div>
	);
};

export default FeedIndividualPost;
