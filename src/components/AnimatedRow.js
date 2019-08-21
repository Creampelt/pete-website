import React from "react";
import MoveIn from "./MoveIn";

const SPACER = 200;

export default class AnimatedRow extends React.Component {
  constructor(props) {
    super(props);
    this.bottomRef = React.createRef();
    this.topRef = React.createRef();
    this.state = {
      height: 0
    }
  }

  setHeight = () => {
    if (this.bottomRef.current.offsetHeight > this.topRef.current.offsetHeight) {
      this.setState({ height: this.bottomRef.current.offsetHeight })
    } else {
      this.setState({ height: this.topRef.current.offsetHeight })
    }
  };

  componentDidMount() {
    this.setHeight();
  }

  render() {
    let rightBottom = this.props.bottom === "right";
    return (
      <div className={"section"} style={{ height: this.state.height + SPACER }}>
        <MoveIn from={this.props.bottom}>
          <div className={"bottom-block " + (rightBottom ? "right-block" : "left-block")} ref={this.bottomRef}>
            {rightBottom ? this.props.rightContent : this.props.leftContent}
          </div>
        </MoveIn>
        <MoveIn from={this.props.bottom === "right" ? "left" : "right"}>
          <div className={"top-block " + (!rightBottom ? "right-block" : "left-block")} ref={this.topRef} style={{ top: this.props.offset }}>
            {!rightBottom ? this.props.rightContent : this.props.leftContent}
          </div>
        </MoveIn>
        <div className={"spacer"} />
      </div>
    )
  }
}