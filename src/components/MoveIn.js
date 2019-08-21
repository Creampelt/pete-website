import React from "react";

export default class MoveIn extends React.Component {
  constructor(props) {
    super(props);
    this.moveInRef = React.createRef();
    this.state = {
      onScreen: false
    }
  }

  setOnScreen = () => {
    let onScreen = this.moveInRef.current.getBoundingClientRect().top < window.innerHeight * 2 / 3;
    if (onScreen && onScreen !== this.state.onScreen) {
      this.setState({ onScreen });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.setOnScreen);
    this.setOnScreen();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.setOnScreen);
  }

  render() {
    let from = (this.props.from !== "left" && this.props.from !== "right") ? "left" : this.props.from;
    return (
      <div className={this.state.onScreen ? "move-in-shown" : `move-in-${from}-hidden`} ref={this.moveInRef} onScroll={this.setOnScreen}>
        {this.props.children}
      </div>
    )
  }
}