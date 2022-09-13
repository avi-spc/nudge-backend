import TitleHeaderBar from '../headerBars/TitleHeaderBar';

const EditProfile = () => {
	return (
		<div className="container edit-profile">
			<TitleHeaderBar />
			<div className="edit-profile__form-p-image">
				<form className="edit-profile__form text-normal-R">
					<label htmlFor="">Name</label>
					<input type="text" />
					<label htmlFor="">Username</label>
					<input type="text" />
					<label htmlFor="">Bio</label>
					<textarea name="" id="" cols="30" rows="8"></textarea>
				</form>
				<div className="edit-profile__image-p-username">
					<div className="edit-profile__image"/>
					<div>
						<div className="text-large-M">justdoingokhay</div>
						<button className="btn btn--rect-es text-small-R">Change profile picture</button>
					</div>
					<button className="btn btn--rect-sm text-medium-R edit-profile__btn-save">Save</button>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
