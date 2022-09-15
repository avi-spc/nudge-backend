const Alert = () => {
	return (
		<div className="alert success">
			<span className="material-symbols-outlined">check_circle</span>
            <span className="text-medium-M">invalid credentials</span>
			<span className="material-symbols-outlined symbol--md alert__btn-close">close</span>
		</div>
	);
};

export default Alert;
