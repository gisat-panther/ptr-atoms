import PropTypes from 'prop-types';
import _ from 'lodash';
import Value from './Value';
import Icon from '../Icon/PantherIcon';

import './select.scss';
import Select from './index';

const MultiSelect = ({
	creatable,
	disabled,
	optionLabel,
	optionValue,
	onAdd,
	onChange,
	onOptionLabelClick,
	options,
	selectedValues,
	singleValue,
	unfocusable,
	withKeyPrefix,
	// ordered: PropTypes.bool // ordered values
}) => {
	/**
	 * Get value(key) from option
	 * @param option {string | Object}
	 * @return {string}
	 */
	const getOptionValue = option => {
		if (optionValue && _.isObject(option)) {
			return _.get(option, optionValue);
		} else {
			return option;
		}
	};

	/**
	 * Get label from option
	 * @param option {string | Object}
	 * @return {string}
	 */
	const getOptionLabel = option => {
		if (optionLabel) {
			return _.get(option, optionLabel);
		} else {
			return option;
		}
	};

	/**
	 * Get collection of prepared options {label: 'string', value: 'string'}
	 * @param options {Array} Array of keys or collection of options
	 * @return {Array}
	 */
	const getFormattedOptions = options => {
		let optionsToFormat = [...options];
		if (!_.isArray(options)) {
			optionsToFormat = [options];
		}

		return optionsToFormat.map(option => {
			if (option) {
				return {
					value: getOptionValue(option),
					label: getOptionLabel(option),
				};
			} else {
				return [];
			}
		});
	};

	/**
	 * @return {Array} Collection of selected options
	 */
	const getSelectedOptions = () => {
		let selectedValuesSelf = selectedValues;

		if (selectedValuesSelf && options) {
			if (!_.isArray(selectedValuesSelf)) {
				selectedValuesSelf = [selectedValuesSelf];
			}
			if (optionValue) {
				return _.filter(options, option => {
					let optionKey = getOptionValue(option);
					return !!_.find(selectedValuesSelf, selected => {
						return optionKey === getOptionValue(selected);
					});
				});
			} else {
				return selectedValues;
			}
		} else {
			return [];
		}
	};

	/**
	 * @param selectedOption {Object}
	 */
	const onChangeSelf = selectedOption => {
		let selectedOptions = getSelectedOptions();
		onChange([...selectedOptions, selectedOption]);
	};

	/**
	 * @param option {{value: {string}, label: {string}}}
	 * @param event {Object}
	 */
	const onOptionLabelClickSelf = (option, event) => {
		if (onOptionLabelClick) {
			event.stopPropagation();
			event.preventDefault();

			let selectedOption = _.find(options, opt => {
				let key = getOptionValue(opt);
				return key === option.value;
			});

			onOptionLabelClick(selectedOption);
		}
	};

	/**
	 * @param option {{value: {string}, label: {string}}}
	 * @param event {Object}
	 */
	const onRemoveOptionClick = (option, event) => {
		event.stopPropagation();
		event.preventDefault();

		let selected = getSelectedOptions();
		let selectedOptions = _.filter(selected, opt => {
			let key = getOptionValue(opt);
			return key !== option.value;
		});

		onChange(selectedOptions);
	};

	// moveValue(item, direction) {
	// 	const values = this.state.selectedValues.slice(0);
	// 	const value = item[this.props.valueKey];
	//     const index = values.indexOf(value);
	//
	// 	switch(direction) {
	// 		case "up":
	// 			if(index>0) {
	// 				values.splice((index-1), 0, values.splice(index, 1)[0]);
	// 			}
	// 			break;
	// 		case "down":
	// 			if(index<(values.length-1)) {
	// 				values.splice((index+1), 0, values.splice(index, 1)[0]);
	// 			}
	// 			break;
	//     }
	//     this.setState({selectedValues: values}, onChangeSelf);
	// }

	const blockEvent = event => {
		event.stopPropagation();
	};

	const getRemoveIcon = item => {
		return (
			<span
				className=" ptr-icon-inline-wrap"
				key="remove"
				onMouseDown={blockEvent}
				onClick={e => onRemoveOptionClick(item, e)}
				onTouchEnd={e => onRemoveOptionClick(item, e)}
			>
				<Icon
					icon={'times'}
					height={'16'}
					width={'16'}
					className={'ptr-inline-icon hover'}
				/>
			</span>
		);
	};

	// getOrderControl (item, moveUp, moveDown) {
	//     return (
	//         <span
	//             className="ptr-icon-inline-wrap"
	//             key = 'order'
	//         >
	//             {moveUp ? <span
	//                 className="ptr-icon-inline-wrap"
	//                 onMouseDown={this.blockEvent}
	//                 onClick={() => this.moveValue(item, "up")}
	//                 onTouchEnd={() => this.moveValue(item, "up")}
	//                 >
	//                 <Icon icon={'sort-up'} height={'16'}  width={'16'} viewBox={'0 -120 320 512'} className={'ptr-inline-icon hover'}/>
	//             </span> : <span className={'ptr-order-placeholder'}></span>}
	//             {moveDown ? <span
	//                 className=" ptr-icon-inline-wrap"
	//                 onMouseDown={this.blockEvent}
	//                 onClick={() => this.moveValue(item, "down")}
	//                 onTouchEnd={() => this.moveValue(item, "down")}
	//                 >
	//                 <Icon icon={'sort-down'} height={'16'}  width={'16'} viewBox={'0 120 320 512'} className={'ptr-inline-icon hover'}/>
	//             </span> : <span className={'ptr-order-placeholder'}></span>}
	//         </span>
	//     );
	// }

	const getSelectedItem = item => {
		// const itemIndex = selected.findIndex(i => i === item.value);
		// const moveUp = itemIndex !== 0;
		// const moveDown = itemIndex !== selected.length - 1;
		// const orderedControls = this.props.ordered ? this.getOrderControl(item, moveUp, moveDown) : null;

		const startItems = [];
		if (!disabled) {
			startItems.push(getRemoveIcon(item));
		}

		const endItems = [
			<span className={'ptr-icon-inline-wrap'} key={'double-angle'}>
				<Icon
					icon="angle-double-right"
					height={'16'}
					width={'16'}
					className={'ptr-inline-icon'}
				/>
			</span>,
		];

		return (
			<Value
				key={item.value}
				option={item}
				onOptionLabelClick={onOptionLabelClickSelf}
				unfocusable={unfocusable}
				withKeyPrefix={withKeyPrefix}
				//FIXME - loading
				endItems={endItems}
				startItems={startItems}
			/>
		);
	};

	const getSelectedItems = (options, selected) => {
		if (selected && selected.length > 0) {
			return selected
				.reduce((accumulator, selectedValue) => {
					const item = options.find(item => item.value === selectedValue.value);
					return item ? [...accumulator, item] : accumulator;
				}, [])
				.map(i => getSelectedItem(i));
		} else {
			return null;
		}
	};

	const getRestOptions = (options, selectedOptions) => {
		return _.reject(options, item => {
			let key = getOptionValue(item);

			return _.includes(
				selectedOptions.map(selectedOption => {
					return getOptionValue(selectedOption);
				}),
				key
			);
		});
	};

	const renderSelect = options => {
		return creatable ? (
			<Select
				type="creatable"
				disabled={disabled}
				onChange={onChangeSelf}
				onCreate={onAdd}
				options={options}
				optionLabel={optionLabel}
				optionValue={optionValue}
				unfocusable={unfocusable}
				value={null}
				withKeyPrefix={withKeyPrefix}
			/>
		) : (
			<Select
				disabled={disabled}
				onChange={onChangeSelf}
				options={options}
				optionLabel={optionLabel}
				optionValue={optionValue}
				unfocusable={unfocusable}
				value={null}
				withKeyPrefix={withKeyPrefix}
			/>
		);
	};

	let optionsSelf = options || [];
	let selectedOptions = [];

	if (selectedValues) {
		if (!_.isArray(selectedValues)) {
			selectedOptions = [selectedValues];
		} else {
			selectedOptions = selectedValues;
		}
	}

	let formattedOptions = getFormattedOptions(optionsSelf);
	let formattedSelected = getFormattedOptions(selectedOptions);

	let selectedItems = getSelectedItems(formattedOptions, formattedSelected);
	let restOptions = getRestOptions(optionsSelf, selectedOptions);

	let selectComponent = null;
	if (!(singleValue && selectedOptions.length === 1)) {
		selectComponent = renderSelect(restOptions);
	}

	return (
		<div>
			{selectedItems ? <div className="items">{selectedItems}</div> : null}
			{selectComponent}
		</div>
	);
};

MultiSelect.propTypes = {
	creatable: PropTypes.bool,
	disabled: PropTypes.bool,
	optionLabel: PropTypes.string, // path to label
	optionValue: PropTypes.string, // path to value (key)
	onAdd: PropTypes.func,
	onChange: PropTypes.func,
	onOptionLabelClick: PropTypes.func,
	options: PropTypes.array,
	selectedValues: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
	singleValue: PropTypes.bool,
	unfocusable: PropTypes.bool,
	withKeyPrefix: PropTypes.bool,

	// ordered: PropTypes.bool // ordered values
};

export default MultiSelect;
