import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TitleHeaderBar from '../headerBars/TitleHeaderBar';
import UpdateProfileImage from './UpdateProfileImage';

import { updateProfile } from '../../reduxStore/actions/profile';

const UpdateProfile = ({ updateProfile, profile: { profileSelf } }) => {
	const [formData, setFormData] = useState(profileSelf);

	const { name, username, bio } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="container-medium padded update-profile">
			<TitleHeaderBar title="Edit profile" />
			<div className="update-profile__form-p-avatar">
				<form className="update-profile__form text-normal-R">
					<label htmlFor="">Name</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={(e) => onChange(e)}
						className="text-field text-field--sm text-normal-R"
					/>
					<label htmlFor="">Username</label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={(e) => onChange(e)}
						className="text-field text-field--sm text-normal-R"
					/>
					<label htmlFor="">Bio</label>
					<textarea
						id=""
						name="bio"
						value={bio}
						onChange={(e) => onChange(e)}
						cols="30"
						rows="6"
						className="text-field text-field--sm text-normal-R"
					></textarea>
				</form>
				<div className="update-profile__avatar-p-username">
					<div className="update-profile__avatar" />
					<div>
						<div className="text-large-M">{profileSelf.username}</div>
						<button className="btn btn--rect-es text-small-R">Change profile picture</button>
					</div>
					<button
						className="btn btn--rect-sm text-medium-R update-profile__btn-save"
						onClick={() => updateProfile(formData)}
						disabled={name.trim() === '' || username.trim() === ''}
					>
						Save
					</button>
				</div>
			</div>
			<UpdateProfileImage />
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
