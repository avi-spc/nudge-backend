import { useRef } from 'react';
import { connect } from 'react-redux';

import TitleHeaderBar from '../headerBars/TitleHeaderBar';

import { uploadProfileImage, removeProfileImage } from '../../reduxStore/actions/profile';

const UpdateProfileImage = ({ setShowPopup, uploadProfileImage, removeProfileImage }) => {
	const form = useRef();

	return (
		<div className="popup">
			<div className="padded update-profile__image">
				<TitleHeaderBar title="Change profile photo" action={() => setShowPopup(false)} />
				<ul className="text-medium-R">
					<li>
						<form ref={form}>
							<label htmlFor="file">Change profile photo</label>
							<input
								type="file"
								id="file"
								name="file"
								onChange={() => uploadProfileImage(form.current)}
								className="hidden"
							/>
						</form>
					</li>
					<li onClick={() => removeProfileImage()}>Remove</li>
				</ul>
			</div>
		</div>
	);
};

export default connect(null, { uploadProfileImage, removeProfileImage })(UpdateProfileImage);
