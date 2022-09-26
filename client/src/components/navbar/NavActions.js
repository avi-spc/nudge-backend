import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../reduxStore/actions/auth';

import Avatar from '../Avatar';

const NavActions = (props) => {
	const {
		logout,
		profile: { personalProfile }
	} = props;
	
	const location = useLocation();

	useEffect(() => {
		setShowDropdown(false);
	}, [location]);

	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className="navbar__actions">
			<Link to="/feed">
				<span className="material-symbols-outlined symbol--lg">cottage</span>
			</Link>
			<Link to="/create">
				<span className="material-symbols-outlined symbol--lg">loupe</span>
			</Link>
			<span className="material-symbols-outlined symbol--lg">favorite</span>
			<div className="profile-actions" onClick={() => setShowDropdown(!showDropdown)}>
				<Avatar imageId={personalProfile.imageId} classType="avatar" />
				{showDropdown && (
					<ul className="text-medium-R">
						<li>
							<Link to={`/profile/${personalProfile.user}`}>Profile</Link>
						</li>
						<li onClick={() => logout()}>Logout</li>
					</ul>
				)}
			</div>
		</div>
	);
};

NavActions.propTypes = {
	logout: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { logout })(NavActions);
