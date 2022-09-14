import { Fragment } from 'react';

const UserRegistration = () => {
	return (
		<Fragment>
			<form className="sign-up__form">
				<input type="email" placeholder="email" className="text-field text-field--lg text-normal-R" />
				<input
					type="password"
					placeholder="password"
					className="text-field text-field--lg text-normal-R"
				/>
				<input
					type="password"
					placeholder="confirm password"
					className="text-field text-field--lg text-normal-R"
				/>
			</form>
			<button className="btn btn--rect-lg text-medium-SB">Sign Up</button>
		</Fragment>
	);
};

export default UserRegistration;
