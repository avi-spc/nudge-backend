import { Link, useOutletContext, useLocation, useNavigate } from 'react-router-dom';

import TitleHeaderBar from '../../headerBars/TitleHeaderBar';

const Follows = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useOutletContext();

	const followsType = location.pathname.split('/')[3];
	const follows =
		location.pathname.split('/')[3] === 'followers' ? user.follows.followers : user.follows.following;

	return (
		<div className="padded user-profile__follows">
			<TitleHeaderBar title={followsType} action={() => navigate(`/profile/${user._id}`)} />
			<ul className="follows-list">
				{follows.map((follow, index) => {
					return (
						<li key={index}>
							<Link to={`/profile/${follow.user}`}>
								<div className="avatar"></div>
								<div className="text-medium-SB">{follow.username}</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Follows;
