import classes from 'classnames';

import PropTypes from 'prop-types';

import Key from './Key';
import './Item.scss';

const Value = ({
	disabled,
	onOptionLabelClick,
	endItems,
	startItems,
	option,
	unfocusable,
	withKeyPrefix,
}) => {
	const blockEvent = event => {
		event.stopPropagation();
	};

	const onKeyPress = key => {
		if (key.charCode === 13 || key.charCode === 32) {
			onOptionLabelClick(option);
		}
	};

	const onClick = event => {
		onOptionLabelClick(option, event);
	};

	// TODO refactor component
	let prefix = null;
	if (withKeyPrefix) {
		prefix = <Key value={option.value || option.key} />;
	}
	let label = (
		<span className="label" key="label">
			{prefix}
			{option.label}
		</span>
	);

	const itemContent = [
		startItems ? (
			<div className={'ptr-item-actions-start'} key="items-start">
				{/* place for icons/buttons/info on start of the item */}
				{startItems}
			</div>
		) : null,
		label,
		endItems ? (
			<div className={'ptr-item-actions-end'} key="items-end">
				{/* place for icons/buttons/info at the and of the item */}
				{endItems}
			</div>
		) : null,
	];

	if (typeof onOptionLabelClick === 'function') {
		return (
			<a
				className={classes('ptr-item', option.className, {
					disabled: disabled,
				})}
				onMouseDown={blockEvent}
				onTouchEnd={onClick}
				onClick={onClick}
				onKeyPress={onKeyPress}
				style={option.style}
				tabIndex={unfocusable ? -1 : 0}
				title={option.label}
			>
				{itemContent}
			</a>
		);
	} else {
		return (
			<div
				className={classes('ptr-item ptr-icon-inline-wrap', option.className, {
					disabled: disabled,
				})}
				style={{display: 'flex'}}
				title={option.label}
			>
				{itemContent}
			</div>
		);
	}
};

Value.propTypes = {
	disabled: PropTypes.bool, // disabled prop passed to ReactSelect
	onOptionLabelClick: PropTypes.func, // method to handle click on value label
	endItems: PropTypes.arrayOf(PropTypes.element),
	startItems: PropTypes.arrayOf(PropTypes.element),
	option: PropTypes.object.isRequired, // option passed to component
	unfocusable: PropTypes.bool,
	withKeyPrefix: PropTypes.bool,
};

export default Value;
