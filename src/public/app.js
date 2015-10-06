import App from '../components/App';
import React from 'react';

React.render(
    <div>{React.createElement(App, window.props)}</div>,
    document.body
);
