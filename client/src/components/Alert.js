import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = ({ alerts }) => {
	return (
		alerts !== null &&
		alerts.length > 0 && (
			<div className="alerts-group">
				{alerts.map((alert) => (
					<div className={`alert ${alert.alertType}`} key={alert.id}>
						<span className="material-symbols-outlined">
							{alert.alertType === 'success' ? 'check_circle' : 'block'}
						</span>
						<span className="text-medium-M">{alert.message}</span>
						<span className="material-symbols-outlined symbol--md alert__btn-close">close</span>
					</div>
				))}
			</div>
		)
	);
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
