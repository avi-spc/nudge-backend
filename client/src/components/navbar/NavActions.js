import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const NavActions = ({ logoutUser, profile: { profileSelf } }) => {
	return (
		<div className="navbar__actions">
			<span className="material-symbols-outlined symbol--lg">cottage</span>
			<span className="material-symbols-outlined symbol--lg">loupe</span>
			<span className="material-symbols-outlined symbol--lg">favorite</span>
			<div className="profile-actions">
				<div className="avatar"></div>
				<ul className="text-medium-R">
					<li>
						<Link to={`/profile/${profileSelf.user}`}>Profile</Link>
					</li>
					<li onClick={() => logoutUser()}>Logout</li>
				</ul>
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
