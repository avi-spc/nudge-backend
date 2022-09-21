import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TitleHeaderBar from '../../headerBars/TitleHeaderBar';

import { uploadPostImage } from '../../../reduxStore/actions/post';

const ImageUpload = ({ uploadPostImage, createPostImageId }) => {
	const navigate = useNavigate();
	const form = useRef();

	useEffect(() => {
		if (createPostImageId) {
			navigate('/create/publish');
		}
	}, [createPostImageId]);

	return (
		<div className="container-medium padded image-upload">
			<TitleHeaderBar title="Create new post" action={() => navigate('/feed')} />
			<div className="image-upload__buttons">
				<form ref={form}>
					<input type="file" name="file" className="btn text-medium-R" />
				</form>
				{/* <button className="btn btn--rect-sm text-medium-R">Select from device</button>
				<button className="btn btn--cir text-medium-R image-upload__btn-next"></button> */}
				<button
					className="btn btn--cir text-medium-R image-upload__btn-next"
					onClick={() => uploadPostImage(form.current)}
				></button>
			</div>
		</div>
	);
};

ImageUpload.propTypes = {
	publishPost: PropTypes.func.isRequired,
	createPostImageId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	createPostImageId: state.post.createPostImageId
});

export default connect(mapStateToProps, { uploadPostImage })(ImageUpload);
