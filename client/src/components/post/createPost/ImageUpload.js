import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { uploadPostImage } from '../../../reduxStore/actions/post';

import TitleHeaderBar from '../../headerBars/TitleHeaderBar';

const ImageUpload = (props) => {
	const { uploadPostImage, createPostImageId } = props;

	const navigate = useNavigate();
	const postImageForm = useRef();

	useEffect(() => {
		if (createPostImageId) {
			navigate('/create/publish');
		}
	}, [createPostImageId]);

	return (
		<div className="container-medium padded image-upload">
			<TitleHeaderBar title="create new post" action={() => navigate('/feed')} />
			<div className="image-upload__buttons">
				<form ref={postImageForm}>
					<label htmlFor="file" className="btn btn--rect-sm text-medium-R">
						Select from device
					</label>
					<input type="file" id="file" name="file" className="hidden" />
				</form>
				<button
					className="btn btn--cir text-medium-R image-upload__btn-next"
					onClick={() => uploadPostImage(postImageForm.current)}
				></button>
			</div>
		</div>
	);
};

ImageUpload.propTypes = {
	uploadPostImage: PropTypes.func.isRequired,
	createPostImageId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	createPostImageId: state.post.createPostImageId
});

export default connect(mapStateToProps, { uploadPostImage })(ImageUpload);
