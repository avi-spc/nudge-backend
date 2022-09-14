import TitleHeaderBar from '../headerBars/TitleHeaderBar';

const UpdateProfile = () => {
	return (
		<div className="container-medium padded update-profile">
			<TitleHeaderBar />
			<div className="update-profile__form-p-avatar">
				<form className="update-profile__form text-normal-R">
					<label htmlFor="">Name</label>
					<input type="text" className="text-field text-field--sm text-normal-R" />
					<label htmlFor="">Username</label>
					<input type="text" className="text-field text-field--sm text-normal-R" />
					<label htmlFor="">Bio</label>
					<textarea
						name=""
						id=""
						cols="30"
						rows="6"
						className="text-field text-field--sm text-normal-R"
					></textarea>
				</form>
				<div className="update-profile__avatar-p-username">
					<div className="update-profile__avatar" />
					<div>
						<div className="text-large-M">justdoingokhay</div>
						<button className="btn btn--rect-es text-small-R">Change profile picture</button>
					</div>
					<button className="btn btn--rect-sm text-medium-R update-profile__btn-save">Save</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateProfile;
