const LogIn = () => {
	return (
		<div className="container-small log-in">
			<div className="log-in__logo-p-form">
				<div className="log-in__logo">nudge</div>
				<form className="log-in__form">
					<input type="email" placeholder="email" className="text-field text-field--lg text-normal-R" />
					<input
						type="password"
						placeholder="password"
						className="text-field text-field--lg text-normal-R"
					/>
				</form>
				<button className="btn btn--rect-lg text-medium-SB">Log In</button>
			</div>
			<button className="btn-alternate text-medium-R">
				Don't have an account? <span className="text-medium-SB">Sign Up</span>
			</button>
		</div>
	);
};

export default LogIn;
