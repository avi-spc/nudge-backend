import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updatePostOptions } from '../../reduxStore/actions/post';

import Avatar from '../Avatar';

const UserHeaderBar = (props) => {
	const { updatePostOptions, postOptions, personalProfile, username, profileImageId } = props;

	return (
		<div className="user-header-bar">
			<Avatar imageId={profileImageId} classType="avatar" />
			<div className="text-medium-SB">{username}</div>
			<span
				className="material-symbols-outlined symbol--md user-header-bar__btn-more"
				onClick={() =>
					updatePostOptions({
						isVisible: true,
						isMine: username === personalProfile.username
					})
				}
			>
				more_horiz
			</span>
		</div>
	);
};

UserHeaderBar.propTypes = {
	updatePostOptions: PropTypes.func.isRequired,
	postOptions: PropTypes.object.isRequired,
	personalProfile: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	profileImageId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	postOptions: state.post.postOptions,
	personalProfile: state.profile.personalProfile
});

export default connect(mapStateToProps, { updatePostOptions })(UserHeaderBar);
