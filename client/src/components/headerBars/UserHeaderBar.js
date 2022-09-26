import PropTypes from 'prop-types';

import Avatar from '../Avatar';

const UserHeaderBar = (props) => {
	const { username, profileImageId } = props;

	return (
		<div className="user-header-bar">
			<Avatar imageId={profileImageId} classType="avatar" />
			<div className="text-medium-SB">{username}</div>
			<span className="material-symbols-outlined symbol--md user-header-bar__btn-more">
				more_horiz
			</span>
		</div>
	);
};

UserHeaderBar.propTypes = {
	username: PropTypes.string.isRequired,
	profileImageId: PropTypes.string.isRequired
};

export default UserHeaderBar;
