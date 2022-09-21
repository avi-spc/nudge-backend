import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { likePost, unlikePost, savePost, unsavePost } from '../../../reduxStore/actions/post';

const PostActions = ({ likePost, unlikePost, savePost, unsavePost, post, user }) => {
	const [already, setAlready] = useState({
		liked: false,
		saved: false
	});

	useEffect(() => {
		setAlready({
			liked: post.likes.find((like) => like.user._id === user._id) ? true : false,
			saved: user.savedPosts.find((savedPost) => savedPost.post === post._id) ? true : false
		});
	}, []);

	const updateLiked = () => {
		if (already.liked) {
			unlikePost(post._id);
		} else {
			likePost(post._id);
		}

		setAlready({ ...already, liked: !already.liked });
	};

	const updateSaved = () => {
		if (already.saved) {
			unsavePost(post._id);
		} else {
			savePost(post._id);
		}

		setAlready({ ...already, saved: !already.saved });
	};

	return (
		<div className="feed-individual-post__post-actions">
			<span
				id="liked"
				className={`material-symbols-outlined symbol--lg ${already.liked ? 'filled' : ''}`}
				onClick={() => updateLiked()}
			>
				favorite
			</span>
			<span className="material-symbols-outlined symbol--lg">maps_ugc</span>
			<span className="material-symbols-outlined symbol--lg">share</span>
			<span
				id="saved"
				className={`material-symbols-outlined symbol--lg ${already.saved ? 'filled' : ''} btn-save`}
				onClick={() => updateSaved()}
			>
				bookmark
			</span>
		</div>
	);
};

PostActions.propTypes = {
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired,
	savePost: PropTypes.func.isRequired,
	unsavePost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.auth.user
});

export default connect(mapStateToProps, { likePost, unlikePost, savePost, unsavePost })(PostActions);
