import React from "react";

export default class ArrowButton extends React.Component {
  render() {
    return (
      <a href={this.props.href} target={"_blank"} style={{ textDecoration: "none" }}>
        <div className={"arrow-button"}>
          {this.props.children}
          <span>&rarr;</span>
        </div>
      </a>
    )
  }
}