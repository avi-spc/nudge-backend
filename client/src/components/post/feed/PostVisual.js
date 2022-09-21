import UserHeaderBar from '../../headerBars/UserHeaderBar';

const PostVisual = ({ post }) => {
	return (
		<div className="padded feed-individual-post__post-visual">
			<UserHeaderBar username={post.user.username} />
			<img src={`http://localhost:5000/api/posts/image/${post.imageId}`} className="image"></img>
		</div>
	);
};

export default PostVisual;
