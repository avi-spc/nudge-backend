import { Fragment } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from './navbar/Navbar';

const PrivateRoute = (props) => {
	const {
		auth: { isAuthenticated }
	} = props;

	return isAuthenticated ? (
		<Fragment>
			<Navbar />
			<Outlet />
		</Fragment>
	) : (
		<Navigate to="/" />
	);
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
