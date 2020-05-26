import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon';
import Menu from '../Menu';

import './style.scss';

class Button extends React.PureComponent {

	static propTypes = {
		circular: PropTypes.bool,
		className: PropTypes.string,
		disabled: PropTypes.bool,
		ghost: PropTypes.bool,
		holdEnabled: PropTypes.bool,
		icon: PropTypes.string,
		inverted: PropTypes.bool,
		invisible: PropTypes.bool,
		large: PropTypes.bool,
		onClick: PropTypes.func.isRequired,
		onHold: PropTypes.func,
		primary: PropTypes.bool,
		secondary: PropTypes.bool,
		side: PropTypes.string,
		small: PropTypes.bool,
		title: PropTypes.string,
		unfocusable: PropTypes.bool
	};

	static defaultProps = {
		disabled: false,
		onHoldCallStart: 300,
		onHoldCallStep: 50,
	};

	constructor(props) {
		super(props);
		this.node = React.createRef();

		this.state = {
			focused: false,
			menuOpen: false,
			held: false
		};

		this.onBlur = this.onBlur.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);

		this.onMouseOut = this.onMouseOut.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
	}

	componentDidMount() {
		this.node.current.addEventListener('touchstart', this.onTouchStart);
		this.node.current.addEventListener('touchend', this.onTouchEnd);
	}

	componentWillUnmount() {
		this.node.current.removeEventListener('touchstart', this.onTouchStart);
		this.node.current.removeEventListener('touchend', this.onTouchEnd);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.disabled && this.state.held) {
			this.clearHoldTimeout();
		}
	}

	onTouchStart(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		if (this.props.holdEnabled) {
			this.onMouseDown(evt);
		}
	}

	onTouchEnd(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		if (this.props.holdEnabled) {
			this.onMouseOut(evt);
		}
	}

	onMouseDown() {
		if (this.props.holdEnabled && !this.props.disabled) {
			this.clearHoldTimeout();
			this.holdTimeout = setTimeout(this.holdStart.bind(this), this.props.onHoldCallStart);
		}
	};

	onMouseOut() {
		if (this.props.holdEnabled) {
			this.clearHoldTimeout();
			if (this.state.held) {
				this.setState({
					held: false,
				});
			}
		}
	};

	clearHoldTimeout() {
		clearTimeout(this.holdTimeout);
		clearInterval(this.onHoldCallInterval);
	}

	holdStart() {
		this.props.onHold();
		this.onHoldCallInterval = setInterval(this.props.onHold, this.props.onHoldCallStep);

		this.setState({
			held: true,
		});
	};

	onClick(e) {
		if (!this.props.disabled) {
			if (this.props.onClick) {
				this.props.onClick(e);
			}
			this.setState({
				menuOpen: !this.state.menuOpen
			});
		}
	}

	onBlur() {
		this.setState({
			menuOpen: false
		});
	}

	onKeyPress(e) {
		if(e.charCode === 32) {
			this.onClick(e);
		} else if (e.charCode === 13){
			this.onClick(e);
		}
	}


	render() {

		let iconInsert = null;
		if (this.props.icon) {
			// determine icon
			iconInsert = (
				<Icon icon={this.props.icon} />
			);
		}

		let hasContent = false;
		let content = React.Children.map(this.props.children, child => {
			if (child) {
				if (typeof child === 'string') {
					hasContent = true;
					return (
						<div className="ptr-button-caption">{child}</div>
					);
				} else if (typeof child === 'object' && child.type === React.Fragment) {
					hasContent = true;
					return (
						<div className="ptr-button-content">{child}</div>
					);
				} else if (typeof child === 'object' && child.type === Menu) {
					let props = {
						...child.props,
						open: !!this.state.menuOpen,
						className: classNames(child.props.className, 'ptr-button-menu')
					};
					return React.cloneElement(child, props, child.props.children);
				} else {
					hasContent = true;
					return child;
				}
			}
		});

		let classes = classNames(
			'ptr-button', {
				circular: !!this.props.circular,
				disabled: this.props.disabled,
				ghost: !!this.props.ghost,
				icon: !!iconInsert && !hasContent,
				invisible: !!this.props.invisible,
				inverted: !!this.props.inverted,
				large: !!this.props.large,
				primary: !!this.props.primary,
				secondary: !!this.props.secondary,
				side: !!this.props.side,
				'side-left': this.props.side === 'left',
				'side-right': this.props.side === 'right',
				'side-top': this.props.side === 'top',
				'side-bottom': this.props.side === 'bottom',
				small: this.props.small,
			},
			this.props.className
		);

		return (
			<div
				className={classes}
				id={this.props.id}
				onBlur={this.onBlur}
				onClick={this.onClick}
				onKeyPress={this.onKeyPress}
				tabIndex={(this.props.disabled || this.props.unfocusable) ? "-1" : "0"}
				title={this.props.title}
				ref={this.node}
				onMouseLeave={this.onMouseOut}
				onMouseDown={this.onMouseDown}
				onMouseUp={this.onMouseOut}
			>
				{iconInsert}
				{content}
			</div>
		);
	}
}

export default Button;

export const Buttons =  ({vertical, children}) => (<div className={classNames("ptr-buttons", {vertical})}>{children}</div>);
export const ButtonGroup =  ({vertical, className, children}) => (<div className={classNames("ptr-button-group", className, {vertical})}>{children}</div>);
