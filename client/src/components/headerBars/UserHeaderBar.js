const UserHeaderBar = ({ username, imageId }) => {
	return (
		<div className="user-header-bar">
			{imageId ? (
				<img src={`http://localhost:5000/api/profile/image/${imageId}`} alt="" className="avatar" />
			) : (
				<div className="avatar"></div>
			)}
			<div className="text-medium-SB">{username}</div>
			<span className="material-symbols-outlined symbol--md user-header-bar__btn-more">
				more_horiz
			</span>
		</div>
	);
};

export default UserHeaderBar;
