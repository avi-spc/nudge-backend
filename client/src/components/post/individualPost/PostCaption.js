import UserHeaderBar from '../../headerBars/UserHeaderBar';

const PostCaption = ({ post }) => {
	return (
		<div className="individual-post__header-p-caption">
			<UserHeaderBar username={post.user.username} />
			<div className="individual-post__caption-p-elapsed">
				<p className="text-medium-R">{post.caption}</p>
				<span className="elapsed absolute text-small-R">127w</span>
			</div>
		</div>
	);
};

export default PostCaption;
