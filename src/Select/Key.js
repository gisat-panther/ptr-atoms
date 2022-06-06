import PropTypes from 'prop-types';
const copy = (text, e) => {
	navigator.clipboard.writeText(text);
	e.stopPropagation();
};

const Key = ({value}) => {
	if (!value || typeof value !== 'string') return null;

	let shortKey = value.substring(0, 4);
	return (
		<span className="option-id" title={value} onClick={copy.bind(null, value)}>
			{shortKey}
		</span>
	);
};

Key.propTypes = {
	value: PropTypes.string,
};

export default Key;
