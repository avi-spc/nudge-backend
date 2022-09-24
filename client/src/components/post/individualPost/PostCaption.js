import UserHeaderBar from '../../headerBars/UserHeaderBar';

import { timestampInWords } from '../../../reduxStore/utils/timestampFormatter';

const PostCaption = ({ post }) => {
	return (
		<div className="individual-post__header-p-caption">
			<UserHeaderBar username={post.user.username} />
			<div className="individual-post__caption-p-elapsed">
				<p className="text-medium-R">{post.caption}</p>
				<span className="elapsed absolute text-small-R">
					{timestampInWords(post.createdAt, 'short')}
				</span>
			</div>
		</div>
	);
};

export default PostCaption;
