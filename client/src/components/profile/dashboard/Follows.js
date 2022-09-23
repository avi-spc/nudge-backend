import { Link, useOutletContext, useLocation, useNavigate } from 'react-router-dom';

import TitleHeaderBar from '../../headerBars/TitleHeaderBar';

const Follows = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user, profileSeekerFollows } = useOutletContext();

	const followsType = location.pathname.split('/')[3];
	const follows =
		location.pathname.split('/')[3] === 'followers'
			? profileSeekerFollows.followers
			: profileSeekerFollows.following;

	return (
		<div className="popup">
			<div className="padded user-profile__follows">
				<TitleHeaderBar title={followsType} action={() => navigate(`/profile/${user}`)} />
				<ul className="follows-list">
					{follows.map((follow) => (
						<li key={follow.user}>
							<Link to={`/profile/${follow.user._id}`}>
								<div className="avatar"></div>
								<div className="text-medium-SB">{follow.user.username}</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Follows;
