import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserPostGallery from './UserPostGallery';
import Follows from './Follows';

import { retrieveSeekerProfile } from '../../../reduxStore/actions/profile';

const UserProfile = ({ retrieveSeekerProfile, auth: { user }, profile: { profileSeeker } }) => {
	const { user_id } = useParams();

	useEffect(() => {
		retrieveSeekerProfile(user_id);
	}, [user_id]);

	return (
		profileSeeker && (
			<div className="container-medium">
				<div className="user-profile">
					<div className="user-profile__avatar" />
					<div className="user-profile__details">
						<div className="username text-large-M">{profileSeeker.username}</div>

						{user_id !== user._id ? (
							<button className="btn btn--rect-es user-profile__btn-follow">Follow</button>
						) : (
							<Link to="/profile/edit">
								<button className="btn btn--cir user-profile__btn-edit">
									<span className="material-symbols-outlined">edit</span>
								</button>
							</Link>
						)}

						<div className="follows text-medium-R">
							<div>2 posts</div>
							<div>{profileSeeker.user.follows.followers.length} followers</div>
							<div>{profileSeeker.user.follows.following.length} following</div>
						</div>
						<div className="name text-medium-M">{profileSeeker.name}</div>
						<p className="bio text-medium-R">{profileSeeker.bio}</p>
					</div>
				</div>
				<UserPostGallery />
				{/* <Follows /> */}
			</div>
		)
	);
};

UserProfile.propTypes = {
	retrieveSeekerProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { retrieveSeekerProfile })(UserProfile);
