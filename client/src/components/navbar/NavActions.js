import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const NavActions = ({ logoutUser, profile: { personalProfile } }) => {
	const location = useLocation();
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		setShowDropdown(false);
	}, [location]);

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
				{personalProfile.imageId ? (
					<img
						src={`http://localhost:5000/api/profile/image/${personalProfile.imageId}`}
						alt=""
						className="avatar"
					/>
				) : (
					<div className="avatar"></div>
				)}

				{showDropdown && (
					<ul className="text-medium-R">
						<li>
							<Link to={`/profile/${personalProfile.user}`}>Profile</Link>
						</li>
						<li onClick={() => logoutUser()}>Logout</li>
					</ul>
				)}
			</div>
		</div>
	);
};

NavActions.propTypes = {
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps)(NavActions);
