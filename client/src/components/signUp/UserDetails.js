import { Fragment } from 'react';

const UserDetails = () => {
	return (
		<Fragment>
			<form className="sign-up__form">
				<input type="text" placeholder="name" className="input-field text-normal-R" />
				<input type="text" placeholder="username" className="input-field text-normal-R" />
			</form>
			<button className="btn btn--rect-lg text-medium-SB">Confirm</button>
		</Fragment>
	);
};

export default UserDetails;
