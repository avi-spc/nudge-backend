import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FeedIndividualPost from './FeedIndividualPost';

import { retrieveAllPosts } from '../../../reduxStore/actions/post';

const PostFeed = ({ retrieveAllPosts, posts }) => {
	useEffect(() => {
		retrieveAllPosts();
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
	posts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	posts: state.post.posts
});

export default connect(mapStateToProps, { retrieveAllPosts })(PostFeed);
