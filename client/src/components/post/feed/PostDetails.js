import { Link } from 'react-router-dom';

import CommentInput from '../CommentInput';

const PostDetails = ({ post }) => {
	return (
		<div className="feed-individual-post__post-details">
			<div className="details-m-input">
				<div className="username-p-caption">
					<div className="username text-medium-SB">{post.user.username}</div>
					<p className="caption text-medium-R">{post.caption}</p>
				</div>
				<div className="likes-count text-medium-SB">{post.likes.length} likes</div>
				<Link to={`/post/${post._id}`}>
					<div className="comments-count text-medium-R">View all {post.comments.length} comments</div>
				</Link>
				<div className="elapsed-time text-small-R">22 HOURS AGO</div>
			</div>
			<CommentInput postId={post._id} />
		</div>
	);
};

export default PostDetails;
