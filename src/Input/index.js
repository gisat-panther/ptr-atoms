import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.scss';
import EditableText from '../EditableText';

const Index = ({
	children,
	disabled,
	multiline,
	inverted,
	password,
	email,
	date,
	number,
	name,
	onChange,
	placeholder,
	unfocusable,
	value,
}) => {
	const [stateValue, setStateValue] = useState(value);
	const [stateFocus, setStateFocus] = useState();

	useEffect(() => {
		if (value !== stateValue) {
			setStateValue(value);
		}
	}, [value]);

	const onChangeSelf = e => {
		if ((value || value === '') && onChange) {
			// controlled
			onChange(e.target.value);
		} else {
			// uncontrolled
			setStateValue(e.target.value);
		}
	};

	const onChangeMultiline = newValue => {
		if ((value || value === '') && onChange) {
			// controlled
			if (newValue === '') {
				newValue = null;
			}
			onChange(newValue);
		} else {
			// uncontrolled
			setStateValue(newValue);
		}
	};

	const onBlur = () => {
		setStateFocus(false);
	};

	const onFocus = () => {
		setStateFocus(true);
	};

	const renderInput = () => {
		let type = 'text';
		if (password) {
			type = 'password';
		} else if (email) {
			type = 'email';
		} else if (date) {
			type = 'date';
		} else if (number) {
			type = 'number';
		}

		return (
			<input
				type={type}
				disabled={disabled}
				tabIndex={unfocusable ? -1 : 0}
				placeholder={stateFocus ? null : placeholder}
				value={stateValue || ''}
				name={name}
				onChange={onChangeSelf}
				autoFocus={stateFocus}
				onBlur={onBlur}
				onFocus={onFocus}
			/>
		);
	};

	const renderMultiline = () => {
		return (
			<EditableText
				invisible
				disabled={disabled}
				unfocusable={unfocusable}
				value={stateValue || ''}
				name={name}
				onChange={onChangeMultiline}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		);
	};

	let classes = classNames('ptr-input-text', {
		empty: !stateValue,
		focus: stateFocus,
		input: !multiline,
		inverted: !!inverted,
		multiline: multiline,
		disabled: disabled,
	});

	return (
		<div className={classes}>
			{multiline ? renderMultiline() : renderInput()}
			{children}
		</div>
	);
};

Index.propTypes = {
	children: PropTypes.node,
	disabled: PropTypes.bool,
	inverted: PropTypes.bool,
	name: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	unfocusable: PropTypes.bool,
	value: PropTypes.string,
	password: PropTypes.bool,
	email: PropTypes.bool,
	date: PropTypes.bool,
	number: PropTypes.bool,
	multiline: PropTypes.bool,
};

export default Index;
