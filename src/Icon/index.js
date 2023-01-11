import PropTypes from 'prop-types';
import PantherIcon from './PantherIcon';
import ReactIcon from './ReactIcon';
import './style.scss';

const Icon = ({icon}) => {
	const isReactIcon = icon && icon.startsWith('ri-');

	if (isReactIcon) {
		return <ReactIcon icon={icon} />;
	} else {
		return <PantherIcon icon={icon} />;
	}
};

Icon.propTypes = {
	icon: PropTypes.string,
};

export default Icon;
