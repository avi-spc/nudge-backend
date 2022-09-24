import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserSavedPostGallery = ({ retrieveSavedPosts, savedPosts }) => {
	useEffect(() => {
		retrieveSavedPosts();
	}, []);

	return (
		<div className="posts-gallery">
			{savedPosts.length > 0 &&
				savedPosts.map((saved) =>
					saved.post && saved.post.imageId ? (
						<Link to={`/post/${saved.post._id}`} key={saved.post._id}>
							<img
								src={`http://localhost:5000/api/posts/image/${saved.post.imageId}`}
								className="gallery-post"
							></img>
						</Link>
					) : null
				)}
		</div>
	);
};

export default UserSavedPostGallery;
