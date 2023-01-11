import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Toggle from '../Toggle';
import './style.scss';

const Switcher = ({active, className, disabled, icon, name, onClick}) => {
	const classes = classnames(
		'ptr-Switcher',
		{
			'is-active': active,
			'is-interactive': !!onClick,
			'is-disabled': disabled,
		},
		className
	);

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			onClick();
		}
	};

	return (
		<div
			className={classes}
			tabIndex={disabled || !onClick ? -1 : 0}
			onClick={onClick}
			onKeyDown={handleKeyDown}
		>
			<div className="ptr-Switcher-title">
				{icon ? <Icon icon={icon} /> : null}
				<div className="ptr-Switcher-name">{name}</div>
			</div>
			<div className="ptr-Switcher-toggle">
				<Toggle notInteractive={true} disabled={disabled} on={active} />
			</div>
		</div>
	);
};

Switcher.propTypes = {
	active: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	icon: PropTypes.string,
	name: PropTypes.string,
	onClick: PropTypes.func,
};

export default Switcher;
