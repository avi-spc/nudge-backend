import TitleHeaderBar from '../../headerBars/TitleHeaderBar';

const Follows = () => {
	return (
		<div className="padded user-profile__follows">
			<TitleHeaderBar />
			<ul className="follows-list">
				<li>
					<div className="avatar"></div>
					<div className="text-medium-SB">creativekonami</div>
				</li>
				<li>
					<div className="avatar"></div>
					<div className="text-medium-SB">justdoingokhay</div>
				</li>
			</ul>
		</div>
	);
};

export default Follows;
