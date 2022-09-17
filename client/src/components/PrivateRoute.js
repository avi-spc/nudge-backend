import { Fragment } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './navbar/Navbar';

const PrivateRoute = ({ auth: { isAuthenticated } }) => {
	return isAuthenticated ? (
		<Fragment>
			<Navbar />
			<Outlet />
		</Fragment>
	) : (
		<Navigate to="/" />
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
