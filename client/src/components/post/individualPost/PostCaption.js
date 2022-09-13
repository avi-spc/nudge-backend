import UserHeaderBar from '../../headerBars/UserHeaderBar';

const PostCaption = () => {
	return (
		<div className="individual-post__header-p-caption">
			<UserHeaderBar />
			<div className="individual-post__caption-p-elapsed">
				<p className="text-medium-R">
					LetsWalk project. Goal is to make 100 characters and I have made 90 of them so far (not all is
					shown here)
				</p>
				<span className="elapsed absolute text-small-R">127w</span>
			</div>
		</div>
	);
};

export default PostCaption;
