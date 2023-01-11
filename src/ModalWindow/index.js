import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'react-modal';
import IconTool from '../IconTool';

import './style.scss';

const ModalWindow = ({isOpen, onClose, className, children}) => {
	const classes = classnames('ptr-Modal', {}, className);

	return (
		<Modal
			isOpen={isOpen}
			onAfterOpen={() => {}}
			className={classes}
			overlayClassName="ptr-ModalOverlay ptr-light"
			onRequestClose={onClose}
			shouldCloseOnOverlayClick={true}
		>
			<IconTool
				className="ptr-Modal-closeButton"
				icon="ri-close"
				onClick={onClose}
				tooltip={{text: 'Close', position: 'left', id: 'ModalTooltip'}}
			/>
			<div className="ptr-Modal-content">
				<div>{children}</div>
			</div>
		</Modal>
	);
};

ModalWindow.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	className: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const setAppElement = Modal.setAppElement;

export {ModalWindow as default, setAppElement};
