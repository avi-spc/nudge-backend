import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserSavedPostGallery = (props) => {
	const { retrieveSavedPosts, savedPosts } = props;
	
	useEffect(() => {
		retrieveSavedPosts();
	}, []);

	return (
		<div className="posts-gallery">
			{savedPosts.length > 0 &&
				savedPosts.map(
					(saved) =>
						saved.post &&
						saved.post.imageId && (
							<Link to={`/post/${saved.post._id}`} key={saved.post._id}>
								<img
									src={`http://localhost:5000/api/posts/image/${saved.post.imageId}`}
									className="gallery-post"
								></img>
							</Link>
						)
				)}
		</div>
	);
};

UserSavedPostGallery.propTypes = {
	retrieveSavedPosts: PropTypes.func.isRequired,
	savedPosts: PropTypes.array.isRequired
};

export default UserSavedPostGallery;
