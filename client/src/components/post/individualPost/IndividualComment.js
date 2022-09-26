import PropTypes from 'prop-types';

import { timestampInWords } from '../../../reduxStore/utils/timestampFormatter';

import Avatar from '../../Avatar';

const IndividualComment = (props) => {
	const { commentDetails } = props;

	return (
		<div className="individual-post__individual-comment">
			<Avatar imageId={commentDetails.user.profileImageId} classType="avatar" />
			<div className="text-medium-SB">{commentDetails.user.username}</div>
			<span className="elapsed bordered text-small-R">
				{timestampInWords(commentDetails.createdAt, 'short')}
			</span>
			<p className="comment-text text-medium-R">{commentDetails.comment}</p>
			{/* <span className="material-symbols-outlined symbol--sm btn-like">favorite</span>
			<div className="btn-reply text-small-R">Reply</div> */}
		</div>
	);
};

IndividualComment.propTypes = {
	commentDetails: PropTypes.object.isRequired
};

export default IndividualComment;
