import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Loader.scss';

const Loader = ({
	background,
	fadeOut,
	progress,
	transparent,
	blackandwhite,
	small,
}) => {
	let screenClasses = classNames('loading-screen', {
		transparent: transparent,
		'fade-out': fadeOut,
	});

	let containerClasses = classNames('a-loader-container', {
		blackandwhite: blackandwhite,
		small: small,
	});

	let style = null;
	if (background) {
		style = {
			background: background,
		};
	}

	return (
		<div className={screenClasses} style={style}>
			<div className="loading-screen-content-wrap">
				<div className="loading-screen-content">
					<div className={containerClasses}>
						<i className="i1"></i>
						<i className="i2"></i>
						<i className="i3"></i>
						<i className="i4"></i>
						{progress ? (
							<div className="a-loader-progress">{progress} %</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

Loader.propTypes = {
	background: PropTypes.string,
	fadeOut: PropTypes.bool,
	progress: PropTypes.number,
	transparent: PropTypes.bool,
	blackandwhite: PropTypes.bool,
	small: PropTypes.bool,
};

export default Loader;
