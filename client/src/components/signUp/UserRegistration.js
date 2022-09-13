const UserRegistration = () => {
	return (
		<div>
			<form className="sign-up__form">
				<input type="email" placeholder="email" className="text-normal-R" />
				<input type="password" placeholder="password" className="text-normal-R" />
				<input type="password" placeholder="confirm password" className="text-normal-R" />
			</form>
			<button className="btn btn--rect text-medium-SB">Sign Up</button>
		</div>
	);
};

export default UserRegistration;
