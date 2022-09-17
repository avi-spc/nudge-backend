import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavActions from './NavActions';

import { logoutUser } from '../../reduxStore/actions/auth';

const Navbar = ({ logoutUser }) => {
	return (
		<div className="navbar">
			<div className="navbar__logo">nudge</div>
			<NavActions logoutUser={logoutUser} />
		</div>
	);
};

Navbar.protoTypes = {
	logoutUser: PropTypes.func.isRequired
};

export default connect(null, { logoutUser })(Navbar);
