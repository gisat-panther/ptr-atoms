import PropTypes from 'prop-types';
import Value from './Value';
import Icon from '../Icon/PantherIcon';

const AddValue = ({option, unfocusable, onOptionLabelClick}) => {
	const startItems = [
		<span className={'ptr-icon-inline-wrap'} key={'double-angle'}>
			<Icon
				icon="plus"
				height={'32'}
				width={'32'}
				className={'ptr-inline-icon'}
			/>
		</span>,
	];

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

	const className = option && option.className;
	const valOption = {
		label: (option && option.label) || 'Add item',
		className: `${className} ptr-option-add`,
		value: (option && option.value) || 'itemAdd',
	};

	return (
		<Value
			unfocusable={unfocusable}
			option={valOption}
			endItems={endItems}
			startItems={startItems}
			onOptionLabelClick={onOptionLabelClick}
		/>
	);
};

AddValue.propTypes = {
	onOptionLabelClick: PropTypes.func,
	option: PropTypes.object,
	unfocusable: PropTypes.bool,
};

export default AddValue;
