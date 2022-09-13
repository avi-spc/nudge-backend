import TitleHeaderBar from '../../headerBars/TitleHeaderBar';

const PublishPost = () => {
	return (
		<div className="container create-post">
			<TitleHeaderBar />
			<div className="create-post__image-p-caption">
				<div className="create-post__post-image"></div>
				<div className="create-post__user-p-caption">
					<div className="user-details">
						<div className="user-profile-image"></div>
						<div className="username text-medium-SB">justdoingokhay</div>
					</div>
					<textarea
						className="text-medium-R create-post__caption-text"
						name=""
						id=""
						cols="25"
						rows="10"
						placeholder="write a caption ..."
					></textarea>
					<button className="btn btn--rect-sm text-medium-R create-post__btn-publish">Publish</button>
				</div>
			</div>
		</div>
	);
};

export default PublishPost;
