import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super();
    }

    newStyle() {
        return {
            fontSize: '48pt',
            margin: '100px',
            textAlign: 'center',
            color: this.props.color,
        }
    }

    render() {
        return (
            <p style={this.newStyle()}>
                {this.props.message?this.props.message:'Test App'}
            </p>
        );
    }
}
