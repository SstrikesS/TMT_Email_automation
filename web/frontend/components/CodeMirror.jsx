import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
export function HtmlMirror ({Code} ) {
    const onChange = React.useCallback((value, viewUpdate) => {
        console.log('value:', value);
    }, []);
    return (
        <CodeMirror
            value= {Code}
            height0= "500px"
            extensions={[html( )]}
            onChange={onChange}
            editable={false}
        />
    );
}