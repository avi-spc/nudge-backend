import CommentInput from '../CommentInput';

const PostDetails = () => {
	return (
		<div className="individual-post__post-details">
			<div className="avatars-p-meta">
				<div className="liked-avatars">
					<div className="btn btn--cir text-medium-SB"></div>
				</div>
				<div className="meta">
					<div className="likes-info text-medium-R">Liked by johndoe and 67 others</div>
					<div className="post-date text-small-R">MARCH 15, 2020</div>
				</div>
			</div>
			<CommentInput />
		</div>
	);
};

export default PostDetails;
