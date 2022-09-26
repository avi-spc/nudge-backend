import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateProfile } from '../../reduxStore/actions/profile';
import { useForm } from '../../hooks/useForm';
import { isEmpty } from '../../reduxStore/utils/validator';

import TitleHeaderBar from '../headerBars/TitleHeaderBar';
import UpdateProfileImage from './UpdateProfileImage';

const UpdateProfile = (props) => {
	const {
		updateProfile,
		profile: { profileSelf }
	} = props;

	const navigate = useNavigate();

	useEffect(() => {
		setShowPopup(false);
	}, [profileSelf.imageId]);

	const [showPopup, setShowPopup] = useState(false);

	const { name, username, bio } = profileSelf;
	const { formData: profile, onChange } = useForm({ name, username, bio });

	return (
		<div className="container-medium padded update-profile">
			<TitleHeaderBar
				title="edit profile"
				action={() => navigate(`/profile/${profileSelf.user}`)}
			/>
			<div className="update-profile__form-p-avatar">
				<form className="update-profile__form text-normal-R">
					<label htmlFor="">Name</label>
					<input
						type="text"
						name="name"
						value={profile.name}
						onChange={(e) => onChange(e)}
						className="text-field text-field--sm text-normal-R"
					/>
					<label htmlFor="">Username</label>
					<input
						type="text"
						name="username"
						value={profile.username}
						onChange={(e) => onChange(e)}
						className="text-field text-field--sm text-normal-R"
					/>
					<label htmlFor="">Bio</label>
					<textarea
						name="bio"
						value={profile.bio}
						onChange={(e) => onChange(e)}
						cols="30"
						rows="6"
						className="text-field text-field--sm text-normal-R"
					/>
				</form>
				<div className="update-profile__avatar-p-username">
					<div className="update-profile__avatar" />
					<div>
						<div className="text-large-M">{profileSelf.username}</div>
						<button className="btn btn--rect-es text-small-R" onClick={() => setShowPopup(true)}>
							Change profile picture
						</button>
					</div>
					<button
						className="btn btn--rect-sm text-medium-R update-profile__btn-save"
						disabled={isEmpty({ name: profile.name, username: profile.username })}
						onClick={() => updateProfile(profile)}
					>
						Save
					</button>
				</div>
			</div>
			{showPopup && <UpdateProfileImage setShowPopup={setShowPopup} profile={profileSelf} />}
		</div>
	);
};

UpdateProfile.propTypes = {
	updateProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { updateProfile })(UpdateProfile);
