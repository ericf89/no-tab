import React, { PropTypes } from 'react';
function noop() {}

export default function setupViewContainer(Component) {
    class ViewContainer extends React.Component {
        static displayName = `NoTabView - ${Component.displayName}`;

        static childContextTypes = {
            disabled: PropTypes.func.isRequired,
            onFocus: PropTypes.func.isRequired,
            onBlur: PropTypes.func.isRequired,
        };

        constructor(props) {
            super(props);
            this.state = {};
        }

        getChildContext = () =>
            ({
                disabled: formId => (this.state.focusedForm ? formId !== this.state.focusedForm : false),
                onBlur: (formId, cb = noop, e) => this.setState({ focusedForm: null }, () => cb(e)),
                onFocus: (formId, cb = noop, e) => this.setState({ focusedForm: formId }, () => cb(e)),
            });

        render = () => <Component {...this.props} {...this.state} />;
    }

    return ViewContainer;
}
