import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserPostGallery = ({ posts }) => {
	return (
		<div className="posts-gallery">
			{posts.length > 0 &&
				posts.map((post) => (
					<Link to={`/post/${post.post}`} key={post.post}>
						<img
							src={`http://localhost:5000/api/posts/image/${post.imageId}`}
							className="gallery-post"
						></img>
					</Link>
				))}
		</div>
	);
};

export default UserPostGallery;
