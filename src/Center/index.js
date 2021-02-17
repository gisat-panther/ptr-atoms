import React from 'react';
import classNames from 'classnames';

import './style.scss';

export default props => (
	<div
		className={classNames('ptr-center', {
			horizontally: props.horizontally,
			vertically: props.vertically,
		})}
	>
		{props.children}
	</div>
);
