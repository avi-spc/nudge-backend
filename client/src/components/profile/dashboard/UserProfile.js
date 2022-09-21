import { useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserPostGallery from './UserPostGallery';

import {
	retrieveSeekerProfile,
	followUser,
	unfollowUser
} from '../../../reduxStore/actions/profile';
import { discardPostImage } from '../../../reduxStore/actions/post';

const UserProfile = ({
	retrieveSeekerProfile,
	followUser,
	unfollowUser,
	discardPostImage,
	auth: { user },
	profile: { profileSeeker },
	createPostImageId
}) => {
	const { user_id } = useParams();

	useEffect(() => {
		retrieveSeekerProfile(user_id);
	}, [user_id]);

	useEffect(() => {
		if (createPostImageId) discardPostImage(createPostImageId);
	}, []);

	return (
		profileSeeker && (
			<div className="container-medium">
				<div className="user-profile">
					<div className="user-profile__avatar" />
					<div className="user-profile__details">
						<div className="username text-large-M">{profileSeeker.username}</div>

						{user_id === user._id ? (
							<Link to="/profile/edit">
								<button className="btn btn--cir user-profile__btn-edit">
									<span className="material-symbols-outlined">edit</span>
								</button>
							</Link>
						) : user.follows.following.find((follow) => {
								return follow.user === user_id;
						  }) ? (
							<button
								className="btn btn--rect-es user-profile__btn-follow"
								onClick={() => unfollowUser(user_id)}
							>
								Unfollow
							</button>
						) : (
							<button
								className="btn btn--rect-es user-profile__btn-follow"
								onClick={() => followUser(user_id)}
							>
								Follow
							</button>
						)}

						<div className="follows text-medium-R">
							<div>2 posts</div>
							<Link to={`/profile/${user_id}/followers`}>
								{profileSeeker.user.follows.followers.length} followers
							</Link>
							<Link to={`/profile/${user_id}/following`}>
								{profileSeeker.user.follows.following.length} following
							</Link>
						</div>
						<div className="name text-medium-M">{profileSeeker.name}</div>
						<p className="bio text-medium-R">{profileSeeker.bio}</p>
					</div>
				</div>
				<UserPostGallery />
				<Outlet context={{ user: profileSeeker.user }} />
			</div>
		)
	);
};

UserProfile.propTypes = {
	retrieveSeekerProfile: PropTypes.func.isRequired,
	unfollowUser: PropTypes.func.isRequired,
	followUser: PropTypes.func.isRequired,
	discardPostImage: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	createPostImageId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	createPostImageId: state.post.createPostImageId
});

export default connect(mapStateToProps, {
	retrieveSeekerProfile,
	followUser,
	unfollowUser,
	discardPostImage
})(UserProfile);
