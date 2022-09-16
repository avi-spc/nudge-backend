import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../reduxStore/actions/auth';

const LogIn = ({ loginUser }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const login = (e) => {
		e.preventDefault();

		loginUser({ email, password });
	};

	return (
		<div className="container-small log-in">
			<div className="log-in__logo-p-form">
				<div className="log-in__logo">nudge</div>
				<form className="log-in__form">
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
				</form>
				<button className="btn btn--rect-lg text-medium-SB" onClick={(e) => login(e)}>
					Log In
				</button>
			</div>
			<button className="btn-alternate text-medium-R">
				Don't have an account? <span className="text-medium-SB">Sign Up</span>
			</button>
		</div>
	);
};

LogIn.propTypes = {
	loginUser: PropTypes.func.isRequired
};

export default connect(null, { loginUser })(LogIn);
