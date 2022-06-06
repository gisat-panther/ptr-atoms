import PropTypes from 'prop-types';
import SelectBase from 'react-select';
import SelectCreatable from 'react-select/creatable';
import classnames from 'classnames';
import _ from 'lodash';

import './select.scss';
import Key from './Key';
import {utils} from '@gisatcz/ptr-utils';

import {isServer} from '@gisatcz/ptr-core';

const Select = ({
	className,
	clearable,
	components,
	disabled,
	formatOptionLabel,
	multi,
	onChange,
	options,
	optionLabel,
	optionValue,
	type,
	unfocusable,
	value,
	placeholder,
	valueIsTitle,
	withKeyPrefix,
	onCreate,
	menuPortalTarget = null,
}) => {
	const getFormattedOptions = () => {
		return options.map(option => {
			let label = option;
			let value = option;

			if (optionValue) {
				value = _.get(option, optionValue);
			}

			if (optionLabel) {
				label = _.get(option, optionLabel);
			}

			return {value, label, isDisabled: option.isDisabled};
		});
	};

	const onChangeSelf = selectedObject => {
		// multiselect
		if (_.isArray(selectedObject)) {
			if (_.isEmpty(selectedObject)) {
				onChange(null);
			} else if (optionValue) {
				let selected = [];
				_.forEach(selectedObject, item => {
					let originalObject = _.find(options, option => {
						return (item && item.value) === _.get(option, optionValue);
					});
					if (originalObject) {
						selected.push(originalObject);
					}
				});
				onChange(selected);
			} else {
				let values = selectedObject.map(object => object.value);
				onChange(values);
			}
		} else {
			if (optionValue) {
				let selected = _.find(options, option => {
					return (
						_.get(option, optionValue) ===
						(selectedObject && selectedObject.value)
					);
				});
				if (selected) {
					onChange(selected);
				} else {
					onChange(null);
				}
			} else {
				onChange(selectedObject ? selectedObject.value : null);
			}
		}
	};

	const onCreateSelf = label => {
		let key = utils.uuid();
		if (optionValue && optionLabel) {
			let data = {};
			_.set(data, optionValue, key);
			_.set(data, optionLabel, label);
			onCreate(data);
		} else {
			onCreate(label);
		}
	};

	let props = {
		className,
		clearable,
		components,
		disabled,
		formatOptionLabel,
		multi,
		onChange,
		options,
		optionLabel,
		optionValue,
		type,
		unfocusable,
		value,
		placeholder,
		valueIsTitle,
		withKeyPrefix,
		onCreate,
		menuPortalTarget,
	};

	// prepare options
	if (!props.options) {
		props.options = [];
	} else {
		props.options = getFormattedOptions();
	}

	//
	// Secure ssr support for menuPortalTarget
	// https://github.com/JedWatson/react-select/issues/1085
	//
	let menuPortalTargetSelf = null;
	if (!isServer && !props.menuPortalTarget) {
		menuPortalTargetSelf = document.getElementById('ptr-app');
	} else if (
		!isServer &&
		props.menuPortalTarget &&
		typeof props.menuPortalTarget === 'string'
	) {
		menuPortalTargetSelf = document.getElementById(props.menuPortalTarget);
	}

	// prepare selected value
	if (props.value && typeof props.value === 'string') {
		props.value = _.find(props.options, {value: props.value});
	} else if (props.value && props.optionValue && !_.isArray(props.value)) {
		props.value = _.find(props.options, {
			value: _.get(props.value, props.optionValue),
		});
	} else if (_.isArray(props.value)) {
		props.value = _.filter(props.options, option => {
			return !!_.find(props.value, value => {
				if (typeof value === 'string') {
					return value === option.value;
				} else {
					return _.get(value, props.optionValue) === option.value;
				}
			});
		});
	}

	const classes = classnames(
		`ptr-select-container ${className ? className : ''}`,
		{
			'value-is-title': !!valueIsTitle,
			disabled: disabled,
			clearable: clearable,
			multi: multi,
		}
	);

	const renderBase = (props, classes, menuPortalTarget) => {
		return (
			<SelectBase
				className={classes}
				classNamePrefix={'ptr-select'}
				clearable={clearable}
				components={props.components}
				formatOptionLabel={getLabel}
				hideSelectedOptions={props.hideSelectedOptions}
				isClearable={clearable}
				isDisabled={disabled}
				isOptionDisabled={option => option.isDisabled}
				isMulti={multi}
				onChange={onChangeSelf}
				options={props.options}
				tabIndex={props.unfocusable ? -1 : 0}
				value={props.value}
				title={props.value}
				placeholder={props.placeholder}
				styles={{
					menuPortal: base => {
						// eslint-disable-next-line no-unused-vars
						const {zIndex, ...rest} = base; // remove zIndex from base by destructuring
						return {...rest, zIndex: 9999};
					},
				}}
				menuPortalTarget={menuPortalTarget}
			/>
		);
	};

	const renderCreatable = (props, classes, menuPortalTarget) => {
		return (
			<SelectCreatable
				className={classes}
				classNamePrefix={'ptr-select'}
				components={props.components}
				formatOptionLabel={getLabel}
				hideSelectedOptions={props.hideSelectedOptions}
				isClearable={clearable}
				isDisabled={disabled}
				isOptionDisabled={option => option.isDisabled}
				isMulti={multi}
				onChange={onChangeSelf}
				onCreateOption={onCreateSelf}
				options={props.options}
				tabIndex={props.unfocusable ? -1 : 0}
				value={props.value}
				title={props.value}
				styles={{
					menuPortal: base => {
						// eslint-disable-next-line no-unused-vars
						const {zIndex, ...rest} = base; // remove zIndex from base by destructuring
						return {...rest, zIndex: 9999};
					},
				}}
				menuPortalTarget={menuPortalTarget}
			/>
		);
	};

	// OK
	const getLabel = selectOption => {
		if (formatOptionLabel) {
			if (optionValue) {
				let selected = _.find(options, opt => {
					return _.get(opt, optionValue) === selectOption.value;
				});
				if (selected) {
					return formatOptionLabel(selected);
				} else {
					throw new Error(
						'Select#Selected option was not found in original options.'
					);
				}
			} else {
				return formatOptionLabel(selectOption.label);
			}
		} else {
			let labelPrefix = null;
			const labelText = selectOption.label;

			if (withKeyPrefix) {
				labelPrefix = <Key value={selectOption.value} />;
			}

			return (
				<div className="label" key="label">
					{labelPrefix}
					{labelText}
				</div>
			);
		}
	};

	switch (type) {
		case 'creatable':
			return renderCreatable(props, classes, menuPortalTargetSelf);
		default:
			return renderBase(props, classes, menuPortalTargetSelf);
	}
};

Select.propTypes = {
	className: PropTypes.string, // className for the outer element
	clearable: PropTypes.bool,
	components: PropTypes.object,
	disabled: PropTypes.bool,
	formatOptionLabel: PropTypes.func, // custom option rendering
	multi: PropTypes.bool,
	onChange: PropTypes.func, // onChange handler: function (newValue) {}
	options: PropTypes.array,
	optionLabel: PropTypes.string, // path to label
	optionValue: PropTypes.string, // path to value
	type: PropTypes.string,
	unfocusable: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	placeholder: PropTypes.string,
	valueIsTitle: PropTypes.bool,
	withKeyPrefix: PropTypes.bool,

	// creatable
	onCreate: PropTypes.func,

	// id of the element where menu will be rendered
	menuPortalTarget: PropTypes.string,
};

export default Select;
