## NoTab

NoTab is a pair of react components inspired by https://github.com/ChrisWren/touch-input-nav, (though with less functionality as of now).  Whenever a user focuses a form field, NoTab uses React's context to disable surrounding form fields to prevent weird (iOS) tabbing behavior.  Checkout the [blog post](https://medium.com/@ericf89/notab-context-higher-order-components-5fb9932e0c9b) for the full story, and the [example page](http://ericf89.github.io/no-tab/) to see it in action.

*tldr; Normally setting a negative tab index is enough to prevent tabbing... except on iOS*

####Basic Usage
NoTab is made up of two parts: a higher-order (H-O) component that wraps around whatever form(s) you're dealing with, and a H-O component that wraps each individual input/component for enabling/disabling it.

```javascript

import { setupFormInput } from 'no-tab';

// The H-O component will pass the disabled prop to whatever it wraps, so at a minimum
// NoTab needs a component that passes its props to an input.
const NoTabInput = setupFormInput(props => <input {...props}/>)

// BAD: Won't Work
const derp = setupFormInput(<input/>)
```

As mentioned above, your NoTab inputs should be wrapped in a viewContainer somewhere higher up the tree.  Two inputs with different formIds inside the same viewContainer won't be tabbable to one another when either is focused.

```javascript
import { setupViewContainer } from 'no-tab';

const BasicExampleView = setupViewContainer(
    () => (
        <div className="example-view">
            <h3>Basic Example</h3>
            <NoTabInput formId="a"/>
            <NoTabInput formId="b"/>
            <NoTabInput formId="c"/>
            <NoTabInput formId="d"/>
        </div>
    )
);
```

Checkout the [example source](https://github.com/ericf89/no-tab/blob/gh-pages/index.js) to see both sides working together...

