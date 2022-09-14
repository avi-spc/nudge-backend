const UserPostGallery = () => {
	return (
		<div className="posts-gallery">
			<div className="posts-gallery__tabs padded text-medium-SB">
				<div>
					<span class="material-symbols-outlined">grid_on</span>
					<span>POSTS</span>
				</div>
				<div>
					<span class="material-symbols-outlined">bookmark</span>
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
