import img from '../../resources/img/error.gif'

const ErrorMessage = () => {
	return (
		<img src={img} style={{width: 250, height: 250, display: 'block', objectFit: 'contain', margin: '0 auto'}} alt='error' />
	);
};

export default ErrorMessage;