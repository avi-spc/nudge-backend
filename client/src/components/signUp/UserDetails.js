import { Fragment, useState } from 'react';

const UserDetails = ({ createProfile }) => {
	const [formData, setFormData] = useState({
		name: '',
		username: ''
	});

	const { name, username } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const setProfile = (e) => {
		createProfile({ name, username });
	};

	return (
		<Fragment>
			<form className="sign-up__form">
				<input
					type="text"
					name="name"
					value={name}
					onChange={(e) => onChange(e)}
					placeholder="name"
					className="text-field text-field--lg text-normal-R"
				/>
				<input
					type="text"
					name="username"
					value={username}
					onChange={(e) => onChange(e)}
					placeholder="username"
					className="text-field text-field--lg text-normal-R"
				/>
			</form>
			<button className="btn btn--rect-lg text-medium-SB" onClick={(e) => setProfile(e)}>
				Confirm
			</button>
		</Fragment>
	);
};

export default UserDetails;
