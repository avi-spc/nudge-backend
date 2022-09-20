import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addComment } from '../../reduxStore/actions/post';

const CommentInput = ({ addComment, postId }) => {
	const [formData, setFormData] = useState({
		comment: ''
	});

	const { comment } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitComment = (e) => {
		e.preventDefault();

		addComment(comment.trim(), postId);
		setFormData({ ...formData, comment: '' });
	};

	return (
		<div className="comment-input">
			<form className="comment-input__form">
				<input
					type="text"
					name="comment"
					value={comment}
					onChange={(e) => onChange(e)}
					placeholder="Add a comment ..."
					className="text-field text-field--lg text-medium-R"
				/>
				<div className="comment-input__btn-post-container">
					<button
						className="btn text-small-R comment-input__btn-post"
						onClick={(e) => submitComment(e)}
						disabled={comment.trim() === ''}
					>
						POST
					</button>
				</div>
			</form>
		</div>
	);
};

CommentInput.propTypes = {
	addComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired
};

export default connect(null, { addComment })(CommentInput);
