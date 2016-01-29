import React, { PropTypes } from 'react';

export const contextTypes = {
    disabled: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};

export function setupFormInput(Component) {
    class FormInput extends React.Component {
        static displayName = `NoTabInput - ${Component.displayName}`;

        static propTypes = {
            onBlur: PropTypes.func,
            onFocus: PropTypes.func,
            disabled: PropTypes.bool,
            formId: PropTypes.string.isRequired,
        };

        static contextTypes = contextTypes;

        constructor(props) {
            super(props);
        }
        wrapHandler = (formId, contextFunc, propsFunc) => (e) => contextFunc(formId, propsFunc, e);
        render = () => {
            const { props, context } = this;
            const { onBlur, onFocus, disabled, formId, ...other } = props;
            if (!context.onBlur || !context.disabled || !context.onFocus) return (<Component {...props}/>);
            return (<Component
              onBlur={ this.wrapHandler(formId, context.onBlur, onBlur) }
              onFocus={ this.wrapHandler(formId, context.onFocus, onFocus) }
              disabled={ context.disabled(formId) || disabled }
              {...other}
            />);
        };
    }
    return FormInput;
}
