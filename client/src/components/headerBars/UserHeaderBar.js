const UserHeaderBar = ({ username }) => {
	return (
		<div className="user-header-bar">
			<div className="avatar"></div>
			<div className="text-medium-SB">{username}</div>
			<span className="material-symbols-outlined symbol--md user-header-bar__btn-more">more_horiz</span>
		</div>
	);
};

export default UserHeaderBar;
