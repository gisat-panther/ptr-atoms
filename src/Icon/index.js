import PropTypes from 'prop-types';
import PantherIcon from './PantherIcon';
import ReactIcon from './ReactIcon';
import './style.scss';

const Icon = ({icon, className, style}) => {
	const isReactIcon = icon && icon.startsWith('ri-');

	if (isReactIcon) {
		return <ReactIcon {...{icon, className, style}} />;
	} else {
		return <PantherIcon {...{icon, className, style}} />;
	}
};

Icon.propTypes = {
	icon: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
};

export default Icon;
