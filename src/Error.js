import PropTypes from 'prop-types';
import Center from './Center';

/**
 * Error component for use for developer errors in components
 */
const Error = ({children, centered}) => {
	let message = (
		<div style={{background: '#f00', padding: '0 .5rem'}}>{children}</div>
	);

	if (centered) {
		return (
			<Center horizontally vertically>
				{message}
			</Center>
		);
	}

	return message;
};

Error.propTypes = {
	children: PropTypes.node,
	centered: PropTypes.bool,
};

export default Error;
