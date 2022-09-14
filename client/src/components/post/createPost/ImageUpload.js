import TitleHeaderBar from '../../headerBars/TitleHeaderBar';

const ImageUpload = () => {
	return (
		<div className="container-medium padded image-upload">
			<TitleHeaderBar />
			<div className="image-upload__buttons">
				<button className="btn btn--rect-sm text-medium-R">Select from device</button>
				<button className="btn btn--cir text-medium-R image-upload__btn-next"></button>
			</div>
		</div>
	);
};

export default ImageUpload;
