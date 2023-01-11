import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import './style.scss';

const IconTool = ({
	active,
	className,
	disabled,
	floating,
	icon,
	small,
	medium,
	onClick,
	rectangular,
	tooltip,
}) => {
	const classes = classnames(
		'ptr-IconTool',
		{
			'is-active': active,
			'is-disabled': disabled,
			'is-floating': floating,
			'is-rectangular': rectangular,
			'is-medium': medium && !small,
			'is-small': small && !medium,
		},
		className
	);

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			onClick();
		}
	};

	return (
		<div
			tabIndex={disabled ? -1 : 0}
			className={classes}
			onClick={onClick}
			onKeyDown={handleKeyDown}
			data-tip={tooltip?.text}
			data-for={tooltip?.id}
		>
			<Icon icon={icon} />
			{tooltip && !disabled
				? React.createElement(tooltip.component || Tooltip, {
						...tooltip.component?.props,
						id: tooltip.id,
						place: tooltip.position || 'top',
						effect: 'solid',
						delayShow: tooltip.delayShow || 1000,
				  })
				: null}
		</div>
	);
};

IconTool.propTypes = {
	active: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	floating: PropTypes.bool,
	icon: PropTypes.string.isRequired,
	medium: PropTypes.bool,
	onClick: PropTypes.func,
	rectangular: PropTypes.bool,
	small: PropTypes.bool,
	tooltip: PropTypes.object,
};

export default IconTool;
