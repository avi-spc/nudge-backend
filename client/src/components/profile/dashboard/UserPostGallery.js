import { useEffect } from 'react';

const UserPostGallery = ({ retrieveSavedPosts, savedPosts }) => {
	useEffect(() => {
		retrieveSavedPosts();
	}, []);

	return (
		<div className="posts-gallery">
			<div className="posts-gallery__tabs padded text-medium-SB">
				<div>
					<span className="material-symbols-outlined symbol--lg">grid_on</span>
					<span>POSTS</span>
				</div>
				<div>
					<span className="material-symbols-outlined symbol--lg">bookmark</span>
					<span>SAVED</span>
				</div>
			</div>
			<div className="posts-gallery__gallery">
				{savedPosts.length > 0 &&
					savedPosts.map((saved) =>
						saved.post && saved.post.imageId ? (
							<img
								src={`http://localhost:5000/api/posts/image/${saved.post.imageId}`}
								className="gallery-post"
								key={saved.post._id}
							></img>
						) : null
					)}
			</div>
		</div>
	);
};

export default UserPostGallery;
