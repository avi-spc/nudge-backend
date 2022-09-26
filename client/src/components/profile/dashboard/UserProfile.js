import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { retrieveSavedPosts } from '../../../reduxStore/actions/auth';
import { discardPostImage } from '../../../reduxStore/actions/post';
import { getUserProfile, followUser, unfollowUser } from '../../../reduxStore/actions/profile';

import UserPostGallery from './UserPostGallery';
import UserSavedPostGallery from './UserSavedPostGallery';
import Avatar from '../../Avatar';

const UserProfile = (props) => {
	const {
		retrieveSavedPosts,
		discardPostImage,
		getUserProfile,
		followUser,
		unfollowUser,
		auth: { user, savedPosts },
		profile: { userProfile, userProfileFollows },
		createPostImageId
	} = props;

	const { user_id } = useParams();

	useEffect(() => {
		getUserProfile(user_id);
		setActiveTab('post');
	}, [user_id]);

	useEffect(() => {
		if (createPostImageId) discardPostImage(createPostImageId);
	}, []);

	const [activeTab, setActiveTab] = useState('post');

	const editButton = (
		<Link to="/profile/edit">
			<button className="btn btn--cir user-profile__btn-edit">
				<span className="material-symbols-outlined">edit</span>
			</button>
		</Link>
	);

	const followUnfollowButton = user.follows.following.find((follow) => follow.user === user_id) ? (
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
	);

	return (
		userProfile && (
			<div className="container-medium">
				<div className="user-profile">
					<Avatar imageId={userProfile.imageId} classType="user-profile__avatar" />
					<div className="user-profile__details">
						<div className="username text-large-M">{userProfile.username}</div>

						{user_id === user._id ? editButton : followUnfollowButton}

						<div className="follows text-medium-R">
							<div>{userProfile.user.posts.length} posts</div>
							<Link to={`/profile/${user_id}/followers`}>
								{userProfileFollows.followers.length} followers
							</Link>
							<Link to={`/profile/${user_id}/following`}>
								{userProfileFollows.following.length} following
							</Link>
						</div>

						<div className="name text-medium-M">{userProfile.name}</div>
						<p className="bio text-medium-R">{userProfile.bio}</p>
					</div>
				</div>

				<div className="user-profile__gallery-tabs padded text-medium-SB">
					<div
						onClick={() => setActiveTab('post')}
						className={activeTab === 'post' ? 'active' : ''}
					>
						<span className="material-symbols-outlined symbol--lg">grid_on</span>
						<span>POSTS</span>
					</div>
					{user_id === user._id && (
						<div
							onClick={() => setActiveTab('saved')}
							className={activeTab === 'saved' ? 'active' : ''}
						>
							<span className="material-symbols-outlined symbol--lg">bookmark</span>
							<span>SAVED</span>
						</div>
					)}
				</div>

				{activeTab === 'saved' ? (
					<UserSavedPostGallery retrieveSavedPosts={retrieveSavedPosts} savedPosts={savedPosts} />
				) : (
					<UserPostGallery posts={userProfile.user.posts} />
				)}

				<Outlet context={{ user: userProfile.user._id, userProfileFollows }} />
			</div>
		)
	);
};

UserProfile.propTypes = {
	retrieveSavedPosts: PropTypes.func.isRequired,
	discardPostImage: PropTypes.func.isRequired,
	getUserProfile: PropTypes.func.isRequired,
	followUser: PropTypes.func.isRequired,
	unfollowUser: PropTypes.func.isRequired,
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
	retrieveSavedPosts,
	discardPostImage,
	getUserProfile,
	followUser,
	unfollowUser
})(UserProfile);
