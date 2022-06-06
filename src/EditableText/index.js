import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const DEFAULT_HEIGHT = 36;

const EditableText = ({
	disabled,
	required,
	unfocusable,
	onFocus,
	onBlur,
	onChange,
	value,
	large,
	editing,
	inverted,
	placeholder,
	invisible,
}) => {
	const ref = useRef();
	const [height, setHeight] = useState(DEFAULT_HEIGHT);
	const [focused, setFocused] = useState();
	const [valueState, setValue] = useState();

	const resize = () => {
		if (ref.current && typeof ref.current?.scrollHeight != 'undefined') {
			let isHeightDifferent = Math.abs(ref.current.scrollHeight - height) > 2;
			if (isHeightDifferent && ref.current.scrollHeight > DEFAULT_HEIGHT) {
				setHeight(ref.current.scrollHeight);
			}
		}
	};

	useEffect(() => {
		resize();
	}, [value]);

	const onFocusSelf = () => {
		setFocused(true);
		if (onFocus) {
			onFocus();
		}
	};

	const onBlurSelf = () => {
		setFocused(false);
		if (onBlur) {
			onBlur();
		}
	};

	const onChangeSelf = e => {
		if ((value || value === '') && onChange) {
			// controlled
			onChange(e.target.value);
		} else {
			// uncontrolled
			setValue(e.target.value);
		}
	};

	let classes = classNames('ptr-editable-text', {
		disabled: disabled,
		empty: !(value || valueState),
		large: large,
		editing: editing,
		required: required,
		inverted: inverted,
		invisible: invisible,
	});

	let renderValue = value || valueState || '';
	let style = {
		height: renderValue.length ? height : DEFAULT_HEIGHT,
	};

	const renderMessage = () => {
		return required && !(value || valueState) ? (
			<div className="ptr-editable-text-message">Required field</div>
		) : null;
	};

	if (!disabled) {
		let message = renderMessage();

		return (
			<div>
				<textarea
					tabIndex={unfocusable ? -1 : 0}
					className={classes}
					style={style}
					ref={ref}
					value={renderValue}
					placeholder={placeholder}
					onFocus={onFocusSelf}
					onBlur={onBlurSelf}
					spellCheck={focused}
					onChange={onChangeSelf}
				/>
				{message}
			</div>
		);
	} else {
		return <div className={classes}>{value || valueState || ''}</div>;
	}
};

EditableText.propTypes = {
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	unfocusable: PropTypes.bool,
	onFocus: PropTypes.func,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	value: PropTypes.string,
	large: PropTypes.bool,
	editing: PropTypes.bool,
	inverted: PropTypes.bool,
	placeholder: PropTypes.string,
	invisible: PropTypes.bool,
};

export default EditableText;
