import { Link } from 'react-router-dom';

import TitleHeaderBar from '../../headerBars/TitleHeaderBar';

const PostLikedUsers = ({ setShowPopup, post }) => {
	return (
		<div className="popup">
			<div className="padded individual-post__liked-users">
				<TitleHeaderBar title="Likes" action={() => setShowPopup(false)} />
				<ul className="users-list">
					{post.likes.map((like) => (
						<li key={like.user._id}>
							<Link to={`/profile/${like.user._id}`}>
								<div className="avatar"></div>
								<div className="text-medium-SB">{like.user.username}</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PostLikedUsers;
