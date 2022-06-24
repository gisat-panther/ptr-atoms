import {useEffect, useState, Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';

const FadeIn = ({
	delay = 100,
	duration = 1000,
	vertical,
	children,
	style = {},
}) => {
	const [opacity, setOpcity] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setOpcity(1);
		}, 1);
	}, []);

	let classes = classnames('ptr-fade-in-container', {
		vertical: vertical,
	});

	return (
		<div className={classes}>
			{Children.map(children, (child, i) => {
				if (child) {
					let childStyle = {
						...style,
						transition: `opacity ${duration}ms ease-in-out ${i * delay}ms`,
						opacity: opacity,
					};
					return cloneElement(child, {childStyle});
				} else {
					return null;
				}
			})}
		</div>
	);
};

FadeIn.propTypes = {
	delay: PropTypes.number,
	duration: PropTypes.number,
	vertical: PropTypes.bool,
	children: PropTypes.node,
	style: PropTypes.object,
};

export default FadeIn;
