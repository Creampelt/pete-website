import React from "react";
import bannerLogo from "../assets/images/banner-logo-pete-bridge-2020.png";

export default class NavBarMobile extends React.Component {
  state = {
    showMenu: false
  };

  render() {
    return (
      <div className={"wrapper"}>
        <div className={"nav-bar"}>
          <div
            className={`nav-icon ${this.state.showMenu ? "nav-icon-active" : ""}`}
            onClick={() => this.setState({ showMenu: !this.state.showMenu })}
          >
            <div />
          </div>
          <img id={"banner-logo"} src={bannerLogo} alt={"Pete for America Logo"}/>
        </div>
        <div className={`nav-buttons ${!this.state.showMenu ? "hide-nav-buttons" : ""}`}>
          <ul style={{ height: window.innerHeight + "px" }}>{this.props.links}</ul>
        </div>
      </div>
    )
  }
}