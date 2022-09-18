const NavActions = ({ logoutUser }) => {
	return (
		<div className="navbar__actions">
			<span className="material-symbols-outlined symbol--lg">cottage</span>
			<span className="material-symbols-outlined symbol--lg">loupe</span>
			<span className="material-symbols-outlined symbol--lg">favorite</span>
			<div className="profile-actions">
				<div className="avatar" onClick={() => logoutUser()}></div>
				<ul className="text-medium-R">
					<li>Profile</li>
					<li>Logout</li>
				</ul>
			</div>
		</div>
	);
};

export default NavActions;
