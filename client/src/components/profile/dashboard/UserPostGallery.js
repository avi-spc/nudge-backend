const UserPostGallery = () => {
	return (
		<div className="user-post-gallery">
			<div className="user-post-gallery__tabs text-medium-SB">
				<div>
					<div className="icon"></div>
					<span>POSTS</span>
				</div>
				<div>
					<div className="icon"></div>
					<span>SAVED</span>
				</div>
			</div>
			<div className="user-post-gallery__gallery">
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
