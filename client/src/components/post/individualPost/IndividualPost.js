import IndividualComment from './IndividualComment';
import PostActions from './PostActions';
import PostCaption from './PostCaption';
import PostDetails from './PostDetails';

const IndividualPost = () => {
	return (
		<div className="container individual-post">
			<div className="individual-post__image"></div>
			<PostCaption />
			<div>
				<IndividualComment />
			</div>
			<PostActions />
			<PostDetails />
		</div>
	);
};

export default IndividualPost;
