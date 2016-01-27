import React, { PropTypes } from 'react';


export default function setupViewContainer(Component) {
    class ViewContainer extends React.Component {
        static childContextTypes = {
            isDisabled: PropTypes.func.isRequired,
            onFocus: PropTypes.func.isRequired,
            onBlur: PropTypes.func.isRequired,
        };

        constructor(props) {
            super(props);
            this.state = {};
        }

        getChildContext = () =>
            ({
                disabled: formId => this.state.focusedForm ? formId !== this.state.focusedForm : false,
                onBlur: cb => this.setState({ focusedForm: null }, cb),
                onFocus: (formId, cb) => this.setState({ focusedForm: formId }, cb),
            });
        render = () => <Component {...this.props} {...this.state} />;
    }
    return ViewContainer;
}
