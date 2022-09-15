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
					<button className="btn text-small-R comment-input__btn-post">POST</button>
				</div>
			</form>
		</div>
	);
};

export default CommentInput;
