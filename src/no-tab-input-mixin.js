import { PropTypes } from 'react';

export default {
    contextTypes: {
        isDisabled: PropTypes.bool.isRequired,
        onFocus: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired,
    },
};
