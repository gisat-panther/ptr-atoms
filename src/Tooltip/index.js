import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const Tooltip = props => {
	const {appIsDark, ...restProps} = props;

	return <ReactTooltip type={appIsDark ? 'light' : 'dark'} {...restProps} />;
};

Tooltip.propTypes = {
	appIsDark: PropTypes.bool,
};

export default Tooltip;
