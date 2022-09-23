import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TitleHeaderBar from '../../headerBars/TitleHeaderBar';

import { publishPost, discardPostImage } from '../../../reduxStore/actions/post';

const PublishPost = ({ publishPost, discardPostImage, createPostImageId }) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({ caption: '', imageId: createPostImageId });

	const { caption } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (!createPostImageId) {
			navigate('/feed');
		}
	}, [createPostImageId]);

	return (
		<div className="container-medium padded create-post">
			<TitleHeaderBar title="create new post" action={() => discardPostImage(createPostImageId)} />
			<div className="create-post__image-p-caption">
				{createPostImageId && (
					<img
						src={`http://localhost:5000/api/posts/image/${createPostImageId}`}
						className="create-post__image"
					></img>
				)}
				<div className="create-post__user-p-caption">
					<div className="user-details">
						<div className="avatar"></div>
						<div className="username text-medium-SB">justdoingokhay</div>
					</div>
					<textarea
						className="text-medium-R create-post__caption-text"
						name="caption"
						value={caption}
						onChange={(e) => onChange(e)}
						cols="25"
						rows="10"
						placeholder="write a caption ..."
					></textarea>
					<button
						className="btn btn--rect-sm text-medium-R create-post__btn-publish"
						onClick={() => publishPost(formData)}
						disabled={caption.trim() === ''}
					>
						Publish
					</button>
				</div>
			</div>
		</div>
	);
};

PublishPost.propTypes = {
	publishPost: PropTypes.func.isRequired,
	discardPostImage: PropTypes.func.isRequired,
	createPostImageId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	createPostImageId: state.post.createPostImageId
});

export default connect(mapStateToProps, { publishPost, discardPostImage })(PublishPost);
