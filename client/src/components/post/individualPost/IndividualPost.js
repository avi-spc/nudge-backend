import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IndividualComment from './IndividualComment';
import PostActions from './PostActions';
import PostCaption from './PostCaption';
import PostDetails from './PostDetails';

import { retrieveIndividualPost } from '../../../reduxStore/actions/post';

const IndividualPost = ({ retrieveIndividualPost, post }) => {
	const { post_id } = useParams();

	useEffect(() => {
		retrieveIndividualPost(post_id);
	}, [post_id]);

	return (
		post && (
			<div className="container-large">
				<div className="padded individual-post">
					<img
						src={`http://localhost:5000/api/posts/image/${post.imageId}`}
						className="individual-post__image"
					></img>
					<PostCaption post={post} />
					<div className="individual-post__comments-list">
						{post.comments.map((comment) => {
							return <IndividualComment commentDetails={comment} key={comment._id} />;
						})}
					</div>
					<PostActions post={post} />
				</div>
				<PostDetails post={post} />
			</div>
		)
	);
};

IndividualPost.propTypes = {
	retrieveIndividualPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post.currentPost
});

export default connect(mapStateToProps, { retrieveIndividualPost })(IndividualPost);
