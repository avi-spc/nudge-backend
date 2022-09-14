import CommentInput from '../CommentInput';

const PostDetails = () => {
	return (
		<div className="feed-individual-post__post-details">
			<div className="likes-count text-medium-SB">2078 likes</div>
			<div className="username-p-caption">
				<span className="text-medium-SB">justdoingokhay</span>{' '}
				<p className="caption text-medium-R">
					what an amazing post. Hooray !!!what an amazing post. Hooray !!!what an amazing post. Hooray
					!!!what an amazing post. Hooray !!!what an amazing post. Hooray !!!what an amazing post. Hooray
					!!!
				</p>
			</div>
			<div className="comments-count text-medium-R">View all 102 comments</div>
			<div className="elapsed-time text-small-R">22 HOURS AGO</div>
			<CommentInput />
		</div>
	);
};

export default PostDetails;
