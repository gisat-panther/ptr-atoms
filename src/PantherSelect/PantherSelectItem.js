import {useContext} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PantherSelectContext from './context';

const PantherSelectItem = ({
	disabled = false,
	selected,
	children,
	style,
	className,
	itemKey,
}) => {
	const context = useContext(PantherSelectContext);

	const onClick = () => {
		if (!disabled) {
			if (context.onSelect) {
				context.onSelect(itemKey);
			}
		}
	};

	// const onBlur = () => {};

	// const onKeyPress = e => {
	// 	if (e.charCode === 32) {
	// 		onClick(e);
	// 	} else if (e.charCode === 13) {
	// 		onClick(e);
	// 	}
	// };

	let classes = classNames(
		'ptr-panther-select-item',
		{
			selected: !!selected,
			disabled: disabled,
		},
		className
	);

	return (
		<div className={classes} style={style} onMouseDown={onClick}>
			{children}
		</div>
	);
};

PantherSelectItem.propTypes = {
	disabled: PropTypes.bool,
	selected: PropTypes.bool,
	onSelect: PropTypes.func,
	style: PropTypes.object,
	children: PropTypes.node,
	className: PropTypes.string,
	itemKey: PropTypes.string,
};

export default PantherSelectItem;
