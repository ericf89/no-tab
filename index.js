import React from 'react';
import ReactDOM from 'react-dom';
import { setupViewContainer, setupFormInput } from 'no-tab';

const Input = setupFormInput(props => <input {...props}/>);

const BasicExampleView = setupViewContainer(
    () => (
        <div className="example-view">
            <h3>Basic Example</h3>
            <Input placeholder="formId a" formId="a"/>
            <Input placeholder="formId b" formId="b"/>
            <Input placeholder="formId c" formId="c"/>
            <Input placeholder="formId d" formId="d"/>
        </div>
    )
);

const MultiInputFormExampleView = setupViewContainer(
    () => (
        <div className="example-view">
            <h3>Matching FormId Example</h3>
            <Input placeholder="formId a" formId="a"/>
            <Input placeholder="formId a" formId="a"/>
            <Input placeholder="formId b" formId="b"/>
            <Input placeholder="formId b" formId="b"/>
        </div>
    )
);

ReactDOM.render(
    <div>
    <h1>NoTab Examples</h1>
    <BasicExampleView/>
    <MultiInputFormExampleView/>
    </div>,
    document.getElementById('example')
);

