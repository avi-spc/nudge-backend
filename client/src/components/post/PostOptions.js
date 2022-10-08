import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updatePostOptions } from '../../reduxStore/actions/post';

const PostOptions = (props) => {
	const { updatePostOptions, postIsMine } = props;

	return (
		<div className="popup">
			<div className="post-options">
				<ul className="text-medium-R">
					<li>
						<button
							className="btn btn--cir"
							onClick={() => updatePostOptions({ isVisible: false })}
						>
							<span className="material-symbols-outlined">close</span>
						</button>
					</li>
					{postIsMine ? (
						<li>
							<button className="btn--danger text-medium-R">Delete Post</button>
						</li>
					) : (
						<li>
							<button className="btn btn--rect-sm expand text-medium-R">
								Follow
							</button>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

PostOptions.propTypes = {
	updatePostOptions: PropTypes.func.isRequired,
	postIsMine: PropTypes.bool.isRequired
};

export default connect(null, { updatePostOptions })(PostOptions);
