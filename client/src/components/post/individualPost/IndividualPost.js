import IndividualComment from './IndividualComment';
import PostActions from './PostActions';
import PostCaption from './PostCaption';
import PostDetails from './PostDetails';

const IndividualPost = () => {
	return (
		<div className="container-large">
			<div className="padded individual-post">
				<div className="individual-post__image"></div>
				<PostCaption />
				<div className="individual-post__comments-list">
					<IndividualComment />
				</div>
				<PostActions />
			</div>
			<PostDetails />
		</div>
	);
};

export default IndividualPost;
