const CommentInput = () => {
	return (
		<div className="comment-input">
			<form className="comment-input__form">
				<input
					type="text"
					placeholder="Add a comment ..."
					className="text-field text-field--lg text-medium-R"
				/>
				<div className="comment-input__btn-post-container">
					<button className="btn btn-post text-small-R">POST</button>
				</div>
			</form>
		</div>
	);
};

export default CommentInput;
