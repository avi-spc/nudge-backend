import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { retrieveAllPosts, discardPostImage } from '../../../reduxStore/actions/post';

import FeedIndividualPost from './FeedIndividualPost';

const PostFeed = (props) => {
	const {
		retrieveAllPosts,
		discardPostImage,
		post: { posts, createPostImageId }
	} = props;

	useEffect(() => {
		retrieveAllPosts();

		if (createPostImageId) {
			discardPostImage(createPostImageId);
		}
	}, []);

	return (
		<div className="container-normal feed">
			{posts.map((post) => {
				return <FeedIndividualPost post={post} key={post._id} />;
			})}
		</div>
	);
};

PostFeed.propTypes = {
	retrieveAllPosts: PropTypes.func.isRequired,
	discardPostImage: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { retrieveAllPosts, discardPostImage })(PostFeed);
