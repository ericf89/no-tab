import React, { PropTypes } from 'react';

export const contextTypes = {
    disabled: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
};

export default function setupFormInput(Component) {
    class FormInput extends React.Component {
        static displayName = `NoTabInput - ${Component.displayName}`;

        static propTypes = {
            onBlur: PropTypes.func,
            onFocus: PropTypes.func,
            disabled: PropTypes.bool,
            formId: PropTypes.string,
        };

        static contextTypes = contextTypes;

        wrapHandler = (formId, contextFunc, propsFunc) => (e) => contextFunc(formId, propsFunc, e);
        render = () => {
            const { props, context } = this;
            const { onBlur, onFocus, disabled, formId, ...other } = props;
            if (!context.onBlur || !context.disabled || !context.onFocus) return (<Component {...props} />);
            this.disabled = context.disabled(formId) || disabled;
            return (<Component
              onBlur={this.wrapHandler(formId, context.onBlur, onBlur)}
              onFocus={this.wrapHandler(formId, context.onFocus, onFocus)}
              disabled={this.disabled}
              {...other}
            />);
        };
    }
    return FormInput;
}
