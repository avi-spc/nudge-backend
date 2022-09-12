const SignIn = () => {
	return (
		<div className="sign-in">
			<div className="sign-in__logo-p-form">
				<div className="sign-in__logo">nudge</div>
				<form className="sign-in__form text-normal-R">
					<input type="email" placeholder="email" className="text-normal-R" />
					<input type="password" placeholder="password" className="text-normal-R" />
				</form>
				<button className="btn btn--rect text-medium-SB">Log In</button>
			</div>
			<button className="sign-in__btn-alternate text-medium-R">
				Don't have an account? <span className="text-medium-SB">Sign Up</span>
			</button>
		</div>
	);
};

export default SignIn;
