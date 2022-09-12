import TitleHeaderBar from '../headerBars/TitleHeaderBar';

const EditProfile = () => {
	return (
		<div>
			<TitleHeaderBar />
			<div>
				<form>
					<label htmlFor="">Name</label>
					<input type="text" />
					<label htmlFor="">Username</label>
					<input type="text" />
					<label htmlFor="">Bio</label>
					<textarea name="" id="" cols="30" rows="10"></textarea>
				</form>
			</div>
			<div>
				<img src="" alt="" />
				<div>
					<div>justdoingokhay</div>
					<button>Change profile picture</button>
				</div>
			</div>
			<button>Save</button>
		</div>
	);
};

export default EditProfile;
