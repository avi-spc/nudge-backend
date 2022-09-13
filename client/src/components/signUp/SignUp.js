import UserImageUpload from './UserImageUpload';
import UserDetails from './UserDetails';
import UserRegistration from './UserRegistration';

const SignUp = () => {
	return (
		<div className="sign-up">
			<div className="sign-up__logo-p-form">
				<div className="sign-up__logo">nudge</div>
				<UserRegistration />
				{/* <UserDetails /> */}
				{/* <UserImageUpload /> */}
			</div>
			<button className="btn-alternate text-medium-R">
				Already have an account? <span className="text-medium-SB">Log In</span>
			</button>
		</div>
	);
};

export default SignUp;
