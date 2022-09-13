const UserDetails = () => {
	return (
		<div>
			<form className="sign-up__form">
				<input type="text" placeholder="name" className="text-normal-R" />
				<input type="text" placeholder="username" className="text-normal-R" />
			</form>
			<button className="btn btn--rect text-medium-SB">Confirm</button>
		</div>
	);
};

export default UserDetails;
