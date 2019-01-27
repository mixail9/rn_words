import React, {Component} from 'react';


class ScreenComponent extends Component {

    componentDidMount() {
        const { addListener } = this.props.navigation
        this.listeners = [
            addListener('didFocus', () => {
                this.isDisplayed = true;
            }),
            addListener('willBlur', () => {
                this.isDisplayed = false;
            }),
        ]
    }

    componentWillUnmount() {
        this.listeners.forEach(
          sub => { sub.remove() },
        )
    }

}

export default ScreenComponent;
