import classnames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

const Toggle = ({className, disabled, notInteractive, on, onClick}) => {
	const classes = classnames(
		'ptr-Toggle',
		{
			'is-disabled': disabled,
			'is-on': on,
			'is-interactive': !notInteractive,
		},
		className
	);

	return (
		<div
			onClick={onClick}
			className={classes}
			tabIndex={disabled || notInteractive ? -1 : 0}
		>
			<div className="ptr-Toggle-bullet" />
		</div>
	);
};

Toggle.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	notInteractive: PropTypes.bool,
	on: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Toggle;
