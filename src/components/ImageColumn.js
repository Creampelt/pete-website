import React from "react";
import "../stylesheets/App.css";
import InViewMonitor from "react-inview-monitor";

export default class ImageColumn extends React.Component {

  render() {
    let size = (this.props.size || 40) + "vw";
    return (
      <InViewMonitor
        classNameNotInView={"move-in-right-hidden"}
        classNameInView={"move-in-shown"}
        intoViewMargin={"100%"}
      >
        <img
          src={this.props.image}
          className={"animated-image"}
          style={{ width: size, height: size }}
          alt={""}
        />
      </InViewMonitor>
    );
  }
}