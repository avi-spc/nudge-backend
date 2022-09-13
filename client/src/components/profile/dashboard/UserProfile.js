import UserPostGallery from './UserPostGallery';

const UserProfile = () => {
	return (
		<div className="container user-profile">
			<div className="user-profile__image-p-details">
				<div className="user-profile__image" />
				<div className="user-profile__details">
					<div className="username text-large-M">justdoingokhay</div>
					<button className="btn btn--cir user-profile__btn-edit"></button>
					<div className="user-profile__follow-numbers text-medium-R">
						<div>2 posts</div>
						<div>121 followers</div>
						<div>2 following</div>
					</div>
					<div className="name text-medium-M">Åvdhësh Yādåv</div>
					<p className="bio text-medium-R">
						Obsessed with indirect sunlight Surfing in suspense, thriller comedy, YouTube - For animation
						series
					</p>
				</div>
			</div>
			{/* <UserPostGallery /> */}
		</div>
	);
};

export default UserProfile;
