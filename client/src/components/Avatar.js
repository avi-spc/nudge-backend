const Avatar = (props) => {
	const { imageId, classType } = props;

	return imageId ? (
		<img src={`http://localhost:5000/api/profile/image/${imageId}`} alt="" className={classType} />
	) : (
		<div className={classType} />
	);
};

export default Avatar;
