const UserPostGallery = () => {
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
				<div className="gallery-post"></div>
				<div className="gallery-post"></div>
				<div className="gallery-post"></div>
				<div className="gallery-post"></div>
				<div className="gallery-post"></div>
				<div className="gallery-post"></div>
			</div>
		</div>
	);
};

export default UserPostGallery;
