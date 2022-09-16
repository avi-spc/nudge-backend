import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../reduxStore/actions/alert';
import { registerUser } from '../../reduxStore/actions/auth';

const UserRegistration = ({ setAlert, registerUser }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirm_password: ''
	});

	const { email, password, confirm_password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const register = (e) => {
		e.preventDefault();

		if (password !== confirm_password) {
			setAlert(`passwords don't match`, 'error');
		} else {
			registerUser({ email, password });
		}
	};

	return (
		<Fragment>
			<form className="sign-up__form">
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => onChange(e)}
					placeholder="email"
					className="text-field text-field--lg text-normal-R"
				/>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => onChange(e)}
					placeholder="password"
					className="text-field text-field--lg text-normal-R"
				/>
				<input
					type="password"
					name="confirm_password"
					value={confirm_password}
					onChange={(e) => onChange(e)}
					placeholder="confirm password"
					className="text-field text-field--lg text-normal-R"
				/>
			</form>
			<button className="btn btn--rect-lg text-medium-SB" onClick={(e) => register(e)}>
				Sign Up
			</button>
		</Fragment>
	);
};

UserRegistration.propTypes = {
	setAlert: PropTypes.func.isRequired,
	registerUser: PropTypes.func.isRequired
};

export default connect(null, { setAlert, registerUser })(UserRegistration);
