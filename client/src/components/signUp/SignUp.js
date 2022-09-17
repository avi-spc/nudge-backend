import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../reduxStore/actions/alert';
import { registerUser } from '../../reduxStore/actions/auth';
import { createProfile } from '../../reduxStore/actions/profile';

import UserImageUpload from './UserImageUpload';
import UserDetails from './UserDetails';
import UserRegistration from './UserRegistration';

const SignUp = ({
	setAlert,
	registerUser,
	createProfile,
	auth: { isAuthenticated },
	profile: { profileSelf }
}) => {
	if (isAuthenticated && profileSelf) {
		return <Navigate to="/feed" />;
	}

	return (
		<div className="container-small sign-up">
			<div className="sign-up__logo-p-form">
				<div className="sign-up__logo">nudge</div>
				{!isAuthenticated && (
					<UserRegistration
						setAlert={setAlert}
						isAuthenticated={isAuthenticated}
						registerUser={registerUser}
					/>
				)}

				{isAuthenticated && !profileSelf && (
					<UserDetails setAlert={setAlert} createProfile={createProfile} />
				)}

				{/* <UserImageUpload /> */}
			</div>
			{!isAuthenticated && (
				<Link to="/">
					<button className="btn-alternate text-medium-R">
						Already have an account? <span className="text-medium-SB">Log In</span>
					</button>
				</Link>
			)}
		</div>
	);
};

SignUp.propTypes = {
	setAlert: PropTypes.func.isRequired,
	registerUser: PropTypes.func.isRequired,
	createProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { setAlert, registerUser, createProfile })(SignUp);
