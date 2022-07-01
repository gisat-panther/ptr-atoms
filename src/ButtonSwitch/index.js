import {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button, {ButtonGroup} from '../Button';

const ButtonSwitch = ({
	disabled = false,
	ghost,
	inverted,
	invisible,
	large,
	onClick,
	small,
	title,
	unfocusable,
	className,
	children,
}) => {
	const onClickSelf = (e, value) => {
		if (!disabled) {
			if (onClick) {
				onClick(value, e);
			}
		}
	};

	const onBlur = () => {};

	const onKeyPress = e => {
		if (e.charCode === 32) {
			onClickSelf(e);
		} else if (e.charCode === 13) {
			onClickSelf(e);
		}
	};

	const restSwitchProps = {
		disabled,
		ghost,
		inverted,
		invisible,
		large,
		onClick,
		small,
		title,
		unfocusable,
		className,
	};

	const content = Children.map(children, child => {
		let {active, value, ...props} = child.props;
		props = {
			...restSwitchProps, //todo should be done by ButtonGroup ?
			...props,
			active: active, //or state
			onClick: evt => onClickSelf(evt, value),
		};
		return cloneElement(child, props, child.props.children);
	});

	let classes = classNames(
		'ptr-button-switch',
		{
			disabled: disabled,
			ghost: !!ghost,
			invisible: !!invisible,
			inverted: !!inverted,
			large: !!large,
			small: small,
		},
		className
	);

	return (
		<ButtonGroup
			className={classes}
			onBlur={onBlur}
			onClick={onClickSelf}
			onKeyPress={onKeyPress}
			tabIndex={disabled || unfocusable ? '-1' : '0'}
			title={title}
		>
			{content}
		</ButtonGroup>
	);
};

ButtonSwitch.propTypes = {
	disabled: PropTypes.bool,
	ghost: PropTypes.bool,
	inverted: PropTypes.bool,
	invisible: PropTypes.bool,
	large: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	small: PropTypes.bool,
	title: PropTypes.string,
	unfocusable: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node,
};

export default ButtonSwitch;

export const ButtonSwitchOption = ({
	active,
	onClick,
	children,
	className,
	...props
}) => {
	return (
		<Button
			className={classNames(className, {active})}
			onClick={onClick}
			{...props}
		>
			{children}
		</Button>
	);
};

ButtonSwitchOption.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
};
