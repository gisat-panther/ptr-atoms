import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';
import PantherSelectContext from './context';
import Item from './PantherSelectItem';
import Icon from '../Icon';

const PantherSelect = ({
	disabled = false,
	currentDisabled = false,
	open,
	onBlur,
	onSelectClick,
	onSelect,
	renderCurrent,
	renderList,
	currentClasses,
	currentStyle = null,
	listClasses,
	className,
	children,
}) => {
	const onClickSelf = e => {
		if (!disabled && !currentDisabled) {
			if (onSelectClick) {
				onSelectClick(e);
			}
		}
	};

	const onBlurSelf = () => {
		if (onBlur) {
			// timout needed, otherwise onBlur prevents onClick
			setTimeout(() => {
				onBlur();
			}, 100);
		}
	};

	const onSelectSelf = itemKey => {
		if (!disabled) {
			if (onSelect) {
				onSelect(itemKey);
			}
		}
	};

	const classes = classNames(
		'ptr-panther-select',
		{
			open: !!open,
			disabled: !!disabled,
			currentDisabled: !!currentDisabled,
		},
		className
	);

	return (
		<div className={classes} onBlur={onBlurSelf}>
			<div
				className={classNames('ptr-panther-select-current', currentClasses, {
					disabled: !!disabled,
				})}
				tabIndex={disabled || currentDisabled ? '-1' : '0'}
				onClick={onClickSelf}
				style={currentStyle}
			>
				<div>
					{renderCurrent(
						disabled,
						currentDisabled,
						open,
						onBlur,
						onSelectClick,
						onSelect,
						renderCurrent,
						renderList,
						currentClasses,
						currentStyle,
						listClasses
					)}
				</div>
				<div className="ptr-panther-select-current-icon">
					<Icon icon="triangle-down" />
				</div>
			</div>
			<div className={classNames('ptr-panther-select-list', listClasses)}>
				<div>
					<div>
						<PantherSelectContext.Provider value={{onSelect: onSelectSelf}}>
							{children}
						</PantherSelectContext.Provider>
					</div>
				</div>
			</div>
		</div>
	);

	// renderList(children) {
	//
	// 	return React.Children.map(children, child => {
	// 		// return child;
	// 		if (typeof child === 'object') {
	// 			if (child.type === Item) {
	// 				let {children, itemKey, ...props} = child.props;
	// 				if (!itemKey) throw new Error('PantherSelectItem must have itemKey set');
	// 				return React.cloneElement(child, {...props, onSelect: this.onSelect.bind(this, itemKey)}, children);
	// 			} else {
	// 				let {children, ...props} = child.props;
	// 				return React.cloneElement(child, props, this.renderList(children));
	// 			}
	// 		} else {
	// 			return child;
	// 		}
	// 	});
	//
	// }
};

PantherSelect.propTypes = {
	disabled: PropTypes.bool,
	currentDisabled: PropTypes.bool, //todo better name
	open: PropTypes.bool,
	onBlur: PropTypes.func,
	onSelectClick: PropTypes.func,
	onSelect: PropTypes.func,
	renderCurrent: PropTypes.func,
	renderList: PropTypes.func,
	currentClasses: PropTypes.string,
	currentStyle: PropTypes.object,
	listClasses: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

export const PantherSelectItem = Item;
export default PantherSelect;
