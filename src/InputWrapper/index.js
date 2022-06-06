import {Children} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import cz from './locales/cz.json';
import en from './locales/en.json';

import './style.scss';
import {withNamespaces, localesUtils} from '@gisatcz/ptr-locales';

// add locales to component namespace
localesUtils.addI18nResources('Atoms#InputWrapper', {cz, en});

const InputWrapper = ({
	divInsteadOfLabel,
	disabled,
	label,
	required,
	className,
	children,
	info,
	t,
}) => {
	let classes = classNames('ptr-input-wrapper', className, {
		disabled: disabled,
	});

	let infoEl = info ? (
		<div className="ptr-input-wrapper-info">{info}</div>
	) : null;
	const childrenEl = Children.map(children, child => {
		if (typeof child === 'object' && child.type === InputWrapperInfo) {
			infoEl = child;
			return null;
		} else {
			return child;
		}
	});
	const requiredEl = required ? (
		<div className="ptr-input-wrapper-required">{t('requiredFieldLabel')}</div>
	) : null;

	return divInsteadOfLabel ? (
		<div className={classes}>
			<div>
				{requiredEl}
				{label ? <span className="ptr-input-label">{label}</span> : null}
				{childrenEl}
			</div>
			{infoEl}
		</div>
	) : (
		<div className={classes}>
			<label>
				{requiredEl}
				<span className="ptr-input-label">{label}</span>
				{childrenEl}
			</label>
			{infoEl}
		</div>
	);
};

InputWrapper.propTypes = {
	divInsteadOfLabel: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	required: PropTypes.bool,
	className: PropTypes.string,
	t: PropTypes.func,
	children: PropTypes.node,
	info: PropTypes.node,
};

export default withNamespaces(['Atoms#InputWrapper'])(InputWrapper);

export const InputWrapperInfo = ({children}) => {
	return <div className="ptr-input-wrapper-info">{children}</div>;
};

InputWrapperInfo.propTypes = {
	children: PropTypes.node,
};
