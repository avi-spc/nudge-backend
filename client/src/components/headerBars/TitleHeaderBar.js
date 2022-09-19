const TitleHeaderBar = ({ title, action: closeAction }) => {
	return (
		<div className="title-header-bar">
			<div className="text-medium-SB">{title}</div>
			<button className="btn btn--cir" onClick={() => closeAction()}>
				<span className="material-symbols-outlined">close</span>
			</button>
		</div>
	);
};

export default TitleHeaderBar;
