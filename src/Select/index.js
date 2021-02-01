import React from 'react';
import PropTypes from 'prop-types';
import SelectBase from 'react-select';
import SelectCreatable from 'react-select/lib/Creatable';
import classnames from 'classnames';
import _ from 'lodash';

import './select.scss';
import Key from "./Key";
import {utils} from '@gisatcz/ptr-utils'

import {
	isServer,
} from '@gisatcz/ptr-core';

class Select extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string, // className for the outer element
        clearable: PropTypes.bool,
        components: PropTypes.object,
        disabled: PropTypes.bool,
        formatOptionLabel: PropTypes.func, // custom option rendering
        multi: PropTypes.bool,
        onChange: PropTypes.func, // onChange handler: function (newValue) {}
        options: PropTypes.array,
        optionLabel: PropTypes.string, // path to label
        optionValue: PropTypes.string, // path to value
        type: PropTypes.string,
        unfocusable: PropTypes.bool,
        value: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        placeholder: PropTypes.string,
        valueIsTitle: PropTypes.bool,
        withKeyPrefix: PropTypes.bool,

        // creatable
        onCreate: PropTypes.func,

        // id of the element where menu will be rendered
        menuPortalTarget: PropTypes.string
    };

    static defaultProps = {
        menuPortalTarget: null,
    }

    constructor(props) {
        super(props);

        this.getLabel = this.getLabel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    getFormattedOptions() {
        return this.props.options.map(option => {
        	let label = option;
        	let value = option;

        	if (this.props.optionValue) {
        		value = _.get(option, this.props.optionValue);
			}

        	if (this.props.optionLabel) {
        		label = _.get(option, this.props.optionLabel)
			}

            return {value, label, isDisabled: option.isDisabled};
        });
    }

    onChange(selectedObject) {
        // multiselect
        if (_.isArray(selectedObject)){
            if (_.isEmpty(selectedObject)) {
                this.props.onChange(null);
            } else if (this.props.optionValue) {
                let selected = [];
                _.forEach(selectedObject, (item) => {
                    let originalObject = _.find(this.props.options, (option) => {return ((item && item.value) === (_.get(option, this.props.optionValue)))});
                    if (originalObject) {
                        selected.push(originalObject);
                    }
                });
                this.props.onChange(selected);
            } else {
                let values = selectedObject.map(object => object.value);
                this.props.onChange(values);
            }
        }

        else {
            if (this.props.optionValue) {
                let selected =  _.find(this.props.options, (option) => {
                    return (_.get(option, this.props.optionValue) === (selectedObject && selectedObject.value))
                });
                if (selected) {
                    this.props.onChange(selected);
                } else {
                    this.props.onChange(null);
                }
            } else {
                this.props.onChange(selectedObject ? selectedObject.value : null);
            }
        }
    }

    onCreate(label) {
        let key = utils.uuid();
        if (this.props.optionValue && this.props.optionLabel) {
            let data = {};
            _.set(data, this.props.optionValue, key);
            _.set(data, this.props.optionLabel, label);
            this.props.onCreate(data);
        } else {
            this.props.onCreate(label);
        }
    }
    
    render() {
        let props = {...this.props};

        // prepare options
        if (!props.options) {
            props.options = [];
        } else {
            props.options = this.getFormattedOptions();
        }

        // 
        // Secure ssr support for menuPortalTarget
        // https://github.com/JedWatson/react-select/issues/1085
        // 
        let menuPortalTarget = null;
        if(!isServer && !props.menuPortalTarget) {
            menuPortalTarget = document.getElementById("ptr-app");
        } else if(!isServer && props.menuPortalTarget && typeof props.menuPortalTarget === 'string') {
            menuPortalTarget = document.getElementById(props.menuPortalTarget);
        }

        // prepare selected value
        if (props.value && typeof props.value === 'string') {
            props.value = _.find(props.options, {value: props.value});
        } else if (props.value && props.optionValue && !_.isArray(props.value)) {
        	props.value = _.find(props.options, {value: _.get(props.value, props.optionValue)})
		} else if (_.isArray(props.value)) {
            props.value = _.filter(props.options, (option) => {
                return !!_.find(props.value, value => {
                    if (typeof value === 'string') {
                        return value === option.value;
                    } else {
                        return _.get(value, props.optionValue) === option.value;
                    }
                });
            });
        }

        const classes = classnames(`ptr-select-container ${this.props.className ? this.props.className : ""}`, {
            'value-is-title': !!this.props.valueIsTitle,
            'disabled': this.props.disabled,
            'clearable': this.props.clearable,
            'multi': this.props.multi
        });

        switch (this.props.type) {
            case 'creatable':
                return this.renderCreatable(props, classes, menuPortalTarget);
            default:
                return this.renderBase(props, classes, menuPortalTarget);
        }
    }

    renderBase(props, classes, menuPortalTarget) {
        return (
            <SelectBase
                className={classes}
                classNamePrefix={'ptr-select'}
                clearable={this.props.clearable}
                components={props.components}
                formatOptionLabel={this.getLabel}
                hideSelectedOptions={props.hideSelectedOptions}
                isClearable={this.props.clearable}
                isDisabled={this.props.disabled}
                isOptionDisabled={(option) => option.isDisabled}
                isMulti={this.props.multi}
                onChange={this.onChange}
                options={props.options}
                tabIndex={props.unfocusable ? -1 : 0}
                value={props.value}
                title={props.value}
                placeholder={props.placeholder}
                styles={{ menuPortal: base => {
                        const { zIndex, ...rest } = base;  // remove zIndex from base by destructuring
                        return { ...rest, zIndex: 9999 };
                    }}}
                menuPortalTarget={menuPortalTarget}
            />
        );
    }

    renderCreatable(props, classes, menuPortalTarget) {
        return (
            <SelectCreatable
                className={classes}
                classNamePrefix={'ptr-select'}
                components={props.components}
                formatOptionLabel={this.getLabel}
                hideSelectedOptions={props.hideSelectedOptions}
                isClearable={this.props.clearable}
                isDisabled={this.props.disabled}
                isOptionDisabled={(option) => option.isDisabled}
                isMulti={this.props.multi}
                onChange={this.onChange}
                onCreateOption={this.onCreate}
                options={props.options}
                tabIndex={props.unfocusable ? -1 : 0}
                value={props.value}
                title={props.value}
                styles={{ menuPortal: base => {
                        const { zIndex, ...rest } = base;  // remove zIndex from base by destructuring
                        return { ...rest, zIndex: 9999 };
                    }}}
                menuPortalTarget={menuPortalTarget}
            />
        )
    }

    getLabel(option) {
        if (this.props.formatOptionLabel) {
            if (this.props.optionValue) {
                let selected =  _.find(this.props.options, (opt) => {
                    return (_.get(opt, this.props.optionValue) === option.value)
                });
                if (selected) {
                    return this.props.formatOptionLabel(selected);
                } else {
                    throw new Error('Select#Selected option was not found in original options.');
                }
            } else {
                return this.props.formatOptionLabel(option.label);
            }
        } else {
            let labelPrefix = null;
            let labelText = option.label;

            if (this.props.withKeyPrefix) {
                labelPrefix = (<Key value={option.value}/>)
            }

            return (
                <div className="label" key='label'>
                    {labelPrefix}
                    {labelText}
                </div>
            );
        }
    }
}

export default Select;