import React, { Component } from 'react';

class Teste extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }

    increaseCounter = () => {
        this.setState(prevState => ({
            counter: prevState.counter + 1
        }), () => {
            console.log(this.state.counter); // Console log the counter value
        });
    };

    render() {
        return (
            <div>
                <h1>Counter: {this.state.counter}</h1>
                <button onClick={this.increaseCounter}>Increase Counter</button>
            </div>
        );
    }
}

export default Teste;