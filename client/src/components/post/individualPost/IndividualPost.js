import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { retrieveIndividualPost } from '../../../reduxStore/actions/post';

import IndividualComment from './IndividualComment';
import PostActions from './PostActions';
import PostCaption from './PostCaption';
import PostDetails from './PostDetails';
import PostLikedUsers from './PostLikedUsers';

const IndividualPost = (props) => {
	const { retrieveIndividualPost, post } = props;

	const { post_id } = useParams();

	useEffect(() => {
		retrieveIndividualPost(post_id);
	}, [post_id]);

	const [showPopup, setShowPopup] = useState(false);

	return (
		post && (
			<div className="container-large">
				<div className="padded individual-post">
					<div className="individual-post__image">
						<img src={`http://localhost:5000/api/posts/image/${post.imageId}`}></img>
					</div>
					<PostCaption post={post} />
					<div className="individual-post__comments-list">
						{post.comments.map((comment) => (
							<IndividualComment commentDetails={comment} key={comment._id} />
						))}
					</div>
					<PostActions post={post} />
				</div>
				<PostDetails post={post} setShowPopup={setShowPopup} />
				{showPopup && <PostLikedUsers post={post} setShowPopup={setShowPopup} />}
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
