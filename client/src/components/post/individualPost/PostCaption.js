import UserHeaderBar from '../../headerBars/UserHeaderBar';

const PostCaption = ({ caption }) => {
	return (
		<div className="individual-post__header-p-caption">
			<UserHeaderBar />
			<div className="individual-post__caption-p-elapsed">
				<p className="text-medium-R">{caption}</p>
				<span className="elapsed absolute text-small-R">127w</span>
			</div>
		</div>
	);
};

export default PostCaption;
