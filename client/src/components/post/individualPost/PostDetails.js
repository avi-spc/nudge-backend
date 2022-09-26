import PropTypes from 'prop-types';

import { timestampInWords } from '../../../reduxStore/utils/timestampFormatter';

import CommentInput from '../CommentInput';

const PostDetails = (props) => {
	const { setShowPopup, post } = props;

	return (
		<div className="individual-post__post-details">
			<div className="avatars-p-meta">
				<div className="liked-avatars">
					<div className="btn btn--cir text-medium-SB"></div>
				</div>
				<div className="meta">
					<div className="likes-info text-medium-R" onClick={() => setShowPopup(true)}>
						{post.likes.length > 0 ? `Liked by ${post.likes[0].user.username}` : null}
						{post.likes.length > 1 ? ` and ${post.likes.length - 1} others` : null}
					</div>
					<div className="post-date text-small-R">{timestampInWords(post.createdAt)}</div>
				</div>
			</div>
			<CommentInput postId={post._id} />
		</div>
	);
};

PostDetails.propTypes = {
	setShowPopup: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

export default PostDetails;
