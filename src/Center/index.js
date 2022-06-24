import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const Center = ({horizontally, vertically, children}) => (
	<div
		className={classNames('ptr-center', {
			horizontally: horizontally,
			vertically: vertically,
		})}
	>
		{children}
	</div>
);

Center.propTypes = {
	children: PropTypes.node,
	horizontally: PropTypes.bool,
	vertically: PropTypes.bool,
};

export default Center;
