import PropTypes from 'prop-types';
import {Children, isValidElement} from 'react';
import classNames from 'classnames';

import './style.scss';

const Menu = ({open, bottom, top, left, right, className, children}) => {
	return (
		<div
			className={classNames('ptr-menu', className, {
				open: open,
				bottom: bottom,
				top: top,
				left: left,
				right: right,
			})}
			style={{
				height: open
					? Children.toArray(children).filter(child => isValidElement(child))
							.length *
							2 +
					  'rem'
					: 0,
			}}
			onClick={e => {
				e.preventDefault();
			}}
		>
			{children}
		</div>
	);
};

Menu.propTypes = {
	bottom: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	left: PropTypes.bool,
	open: PropTypes.bool,
	right: PropTypes.bool,
	top: PropTypes.bool,
};

export default Menu;

export const MenuItem = ({
	selected,
	disabled,
	className,
	children,
	onClick,
}) => {
	let content = Children.map(children, child => {
		if (typeof child === 'string') {
			return <div className="ptr-menu-item-caption">{child}</div>;
		} else {
			return child;
		}
	});

	return (
		<div
			className={classNames('ptr-menu-item', className, {
				selected: selected,
				disabled: disabled,
			})}
			onClick={e => {
				if (onClick) onClick(e);
				e.preventDefault();
			}}
		>
			{content}
		</div>
	);
};

MenuItem.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	selected: PropTypes.bool,
};
