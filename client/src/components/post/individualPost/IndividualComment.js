const IndividualComment = ({ commentDetails }) => {
	return (
		<div className="individual-post__individual-comment">
			<div className="avatar"></div>
			<div className="text-medium-SB">{commentDetails.user.username}</div>
			<span className="elapsed bordered text-small-R">127w</span>
			<p className="comment-text text-medium-R">{commentDetails.comment}</p>
			<span className="material-symbols-outlined symbol--sm btn-like">favorite</span>
			<div className="btn-reply text-small-R">Reply</div>
		</div>
	);
};

export default IndividualComment;
