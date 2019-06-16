import React from "react";
import bannerLogo from "../assets/images/banner-logo-pete-bridge-2020.png";

export default class NavBarMobile extends React.Component {
  render() {
    return (
      <div className={"wrapper"}>
        <div className={"nav-bar"}>
          <div
            className={`nav-icon ${this.props.showMenu ? "nav-icon-active" : ""}`}
            onClick={this.props.toggleMenu}
          >
            <div />
          </div>
          <img id={"banner-logo"} src={bannerLogo} alt={"Pete for America Logo"}/>
        </div>
        <div className={`nav-buttons ${!this.props.showMenu ? "hide-nav-buttons" : ""}`}>
          <ul className={"nav-ul"} style={{ height: window.innerHeight + "px" }}>{this.props.links}</ul>
        </div>
      </div>
    )
  }
}