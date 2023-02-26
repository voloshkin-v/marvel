import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const Page404 = () => {
	return (
		<div>
			<ErrorMessage />
			<div style={{ textAlign: 'center', marginTop: '20px' }}>
				<p>Page doesn't exist</p>
				<Link
					style={{ marginTop: '5px', textDecoration: 'underline' }}
					to="/">
					Back to home page
				</Link>
			</div>
		</div>
	);
};

export default Page404;
