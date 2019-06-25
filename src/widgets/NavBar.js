import React from 'react';
import '../stylesheets/NavBarAndFooter.css';
import bannerLogo from "../assets/images/banner-logo-pete-bridge-2020.png";
import animateScrollTo from 'animated-scroll-to';
import NavBarMobile from "./NavBarMobile";
import { Link } from 'react-router-dom';
import options from "../constants/ScrollToOptions";

function scrollTo(link) {
  animateScrollTo(document.querySelector(link), options);
}

export default class NavBar extends React.Component {
  state = {
    navLinks: null,
    showMenu: false
  };

  toggleMenu = () => this.setState({ showMenu: !this.state.showMenu });

  renderNavLinks = () => {
    let navLinks = this.props.pageLinkData.map(({ title, href, section }, index) => {
      if (this.props.page === href) {
        return (
          <li key={index} className={"nav-li"}>
            <button
              className={`nav-link ${this.props.navColors[index] ? "active-nav-link" : ""}`}
              onClick={() => {
                this.toggleMenu();
                scrollTo(section);
              }}
            >
              {title}
            </button>
          </li>
        )
      } else {
        return (
          <li key={index} className={"nav-li"}>
            <Link
              className={"nav-link"}
              to={href}
              onClick={() => {
                this.props.setSection(section);
                this.toggleMenu();
              }}
            >
              {title}
            </Link>
          </li>
        )
      }
    });
    this.setState({ navLinks });
  };

  componentDidMount() {
    window.addEventListener("resize", this.renderNavLinks);
    this.renderNavLinks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props || prevState === this.state) {
      this.renderNavLinks();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.renderNavLinks);
  }

  render() {
    if (window.innerWidth < 1000) {
      return <NavBarMobile links={this.state.navLinks} showMenu={this.state.showMenu} toggleMenu={this.toggleMenu} />
    } else {
      return (
        <div className={"nav-bar"}>
          <img id={"banner-logo"} src={bannerLogo} alt={"Pete for America Logo"}/>
          <ul className={"nav-ul"}>{this.state.navLinks}</ul>
        </div>
      );
    }
  }
}
