import PropTypes from 'prop-types';
import classNames from 'classnames';
import {createElement, Fragment} from 'react';
import './style.scss';

const renderColumn = (column, index) => {
	let style = {};
	if (column.width) {
		style.width = column.width; // naive for now
		style.flexGrow = 0;
	} else {
		style.flex = 1;
	}

	if (column.maxWidth) {
		style.maxWidth = column.maxWidth;
	}
	if (column.minWidth) {
		style.minWidth = column.minWidth;
	}

	let content = null;
	if (column.component) {
		content = createElement(column.component, column.props);
	} else if (column.render) {
		content = column.render();
	}

	let handle = null;
	if (index) {
		handle = (
			<div className={'ptr-adjustable-column-handle handle' + index}>
				<div />
			</div>
		);
	}

	let className = classNames('ptr-adjustable-column', column.className);

	return (
		<Fragment key={index}>
			{handle}
			<div className={className} style={style}>
				<div className="ptr-adjustable-columns-content">{content}</div>
			</div>
		</Fragment>
	);
};

const AdjustableColumn = ({fixed, content}) => (
	<div className={classNames('ptr-adjustable-columns', {fixed})}>
		{(content && content.length && content.map(renderColumn)) || null}
	</div>
);

AdjustableColumn.propTypes = {
	content: PropTypes.array,
	fixed: PropTypes.bool,
};

export default AdjustableColumn;
