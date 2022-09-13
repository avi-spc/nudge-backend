const CommentInput = () => {
	return (
		<div className="comment-input">
			<form className="comment-input__form">
				<input type="text text-medium-R" placeholder="Add a comment ..." />
				<div className="comment-input__btn-container">
					<button className="btn btn-post text-small-R">POST</button>
				</div>
			</form>
		</div>
	);
};

export default CommentInput;
