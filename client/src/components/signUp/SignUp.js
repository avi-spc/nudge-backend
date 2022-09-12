import ProfileImageUpload from './ProfileImageUpload';
import UserDetails from './UserDetails';
import UserRegistration from './UserRegistration';

const SignUp = () => {
	return (
		<div>
			<div>
				<img src="" alt="" />
				<UserRegistration />
				<UserDetails />
				<ProfileImageUpload />
			</div>
			<button>Already have an account? Log In</button>
		</div>
	);
};

export default SignUp;
