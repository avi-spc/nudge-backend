import IndividualComment from './IndividualComment';
import PostActions from './PostActions';
import PostCaption from './PostCaption';
import PostDetails from './PostDetails';

const PostView = () => {
	return (
		<div>
			<img src="" alt="" />
			<PostCaption />
			<div>
				<IndividualComment />
				<IndividualComment />
				<IndividualComment />
			</div>
			<PostActions />
			<PostDetails />
		</div>
	);
};

export default PostView;
