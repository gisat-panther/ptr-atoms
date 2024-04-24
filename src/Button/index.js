import React, {
	Fragment,
	Children,
	cloneElement,
	useEffect,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon';
import Menu from '../Menu';
import Tooltip from '../Tooltip';

import './style.scss';

const Button = ({
	children,
	circular,
	className,
	disabled = false,
	floating = false,
	ghost,
	icon,
	inverted,
	invisible,
	large,
	onClick,
	onHold,
	primary,
	secondary,
	side,
	small,
	title,
	unfocusable,
	holdStart = 300,
	holdStep = 50,
	id,
	tooltip,
}) => {
	const node = useRef();
	const [menuOpen, setMenuOpen] = useState(false);
	const [held, setHeld] = useState(false);

	const holdTimeout = useRef();
	const onHoldCallInterval = useRef();

	const clearHoldTimeout = () => {
		clearTimeout(holdTimeout.current);
		clearInterval(onHoldCallInterval.current);
	};

	const holdStartSelf = () => {
		onHold();
		onHoldCallInterval.current = setInterval(onHold, holdStep);
		setHeld(true);
	};

	const onMouseDown = () => {
		if (onHold && !disabled) {
			clearHoldTimeout();
			holdTimeout.current = setTimeout(holdStartSelf, holdStart);
		}
	};

	const onMouseOut = () => {
		if (onHold) {
			clearHoldTimeout();
			if (held) {
				setHeld(false);
			}
		}
	};

	const onTouchStart = evt => {
		evt.stopPropagation();
		onMouseDown(evt);
	};

	const onTouchEnd = evt => {
		evt.stopPropagation();
		onMouseOut(evt);
	};

	const addTouchListeners = () => {
		node.current.addEventListener('touchstart', onTouchStart);
		node.current.addEventListener('touchend', onTouchEnd);
	};

	const removeTouchListeners = () => {
		node.current?.removeEventListener('touchstart', onTouchStart);
		node.current?.removeEventListener('touchend', onTouchEnd);
	};

	useEffect(() => {
		if (typeof onHold === 'function') {
			addTouchListeners();
		}
		return () => {
			if (typeof onHold === 'function') {
				removeTouchListeners();
			}
		};
	}, []);

	const onHoldRef = useRef();
	useEffect(() => {
		if (onHoldRef.current && !onHold) {
			removeTouchListeners();
		} else if (!onHoldRef.current && onHold) {
			addTouchListeners();
		}
	}, [onHold]);

	useEffect(() => {
		if (disabled && held) {
			clearHoldTimeout();
		}
	}, [disabled]);

	const onClickSelf = e => {
		if (!disabled) {
			if (onClick) {
				onClick(e);
			}
			setMenuOpen(!menuOpen);
		}
	};

	const onBlur = () => {
		setMenuOpen(false);
	};

	const onKeyPress = e => {
		if (e.charCode === 32) {
			onClickSelf(e);
		} else if (e.charCode === 13) {
			onClickSelf(e);
		}
	};

	let iconInsert = null;
	if (icon) {
		// determine icon
		iconInsert = <Icon icon={icon} />;
	}

	let hasContent = false;
	let content = Children.map(children, child => {
		if (child) {
			if (typeof child === 'string' || typeof child === 'number') {
				hasContent = true;
				return <div className="ptr-button-caption">{child}</div>;
			} else if (typeof child === 'object' && child.type === Fragment) {
				hasContent = true;
				return <div className="ptr-button-content">{child}</div>;
			} else if (typeof child === 'object' && child.type === Menu) {
				let props = {
					...child.props,
					open: !!menuOpen,
					className: classNames(child.props.className, 'ptr-button-menu'),
				};
				return cloneElement(child, props, child.props.children);
			} else {
				hasContent = true;
				return child;
			}
		}
	});

	let classes = classNames(
		'ptr-button',
		{
			circular: !!circular,
			disabled: disabled,
			floating: floating,
			ghost: !!ghost,
			icon: !!iconInsert && !hasContent,
			invisible: !!invisible,
			inverted: !!inverted,
			large: !!large,
			primary: !!primary,
			secondary: !!secondary,
			side: !!side,
			'side-left': side === 'left',
			'side-right': side === 'right',
			'side-top': side === 'top',
			'side-bottom': side === 'bottom',
			small: small,
		},
		className
	);

	return (
		<div
			className={classes}
			id={id}
			onBlur={onBlur}
			onClick={onClickSelf}
			onKeyPress={onKeyPress}
			tabIndex={disabled || unfocusable ? '-1' : '0'}
			title={title}
			ref={node}
			onMouseLeave={onMouseOut}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseOut}
			data-tip={tooltip?.text}
			data-for={tooltip?.id}
		>
			{iconInsert}
			{content}
			{tooltip && !disabled
				? React.createElement(Tooltip, {
						...tooltip.props,
						id: tooltip.id,
						place: tooltip.position || 'top',
						effect: 'solid',
						delayShow: tooltip.delayShow || 1000,
				  })
				: null}
		</div>
	);
};

Button.propTypes = {
	circular: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	ghost: PropTypes.bool,
	floating: PropTypes.bool,
	icon: PropTypes.string,
	inverted: PropTypes.bool,
	invisible: PropTypes.bool,
	large: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	onHold: PropTypes.func,
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	side: PropTypes.string,
	small: PropTypes.bool,
	title: PropTypes.string,
	unfocusable: PropTypes.bool,
	holdStart: PropTypes.number,
	holdStep: PropTypes.number,
	children: PropTypes.node,
	id: PropTypes.string,
	tooltip: PropTypes.object,
};

export default Button;

export const Buttons = ({vertical, children}) => (
	<div className={classNames('ptr-buttons', {vertical})}>{children}</div>
);

Buttons.propTypes = {
	children: PropTypes.node,
	vertical: PropTypes.bool,
};
export const ButtonGroup = ({vertical, className, children}) => (
	<div className={classNames('ptr-button-group', className, {vertical})}>
		{children}
	</div>
);

ButtonGroup.propTypes = {
	children: PropTypes.node,
	vertical: PropTypes.bool,
	className: PropTypes.string,
};
