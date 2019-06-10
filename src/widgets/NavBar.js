import React from 'react';
import '../stylesheets/nav-bar-and-footer.css';
import bannerLogo from "../assets/images/banner-logo-pete-bridge-2020.png";
import animateScrollTo from 'animated-scroll-to';
import NavBarMobile from "./NavBarMobile";
import { Link } from 'react-router-dom';

const PAGES = [
  { title: "Home", href: "/", subHref: "#home" },
  { title: "About Us", href: "/", subHref: "#about-us", },
  { title: "Meet Pete", href: "/", subHref: "#meet-pete" },
  { title: "Collateral", href: "/collateral" },
];

const OPTIONS = {
  offset: -79
};

function scrollTo(link) {
  animateScrollTo(document.querySelector(link), OPTIONS);
}

export default class NavBar extends React.Component {
  state = {
    navLinks: null
  };

  renderNavLinks() {
    let navLinks = PAGES.map(({ title, href, subHref }, index) => {
      if (this.props.page === href && subHref) {
        return (
          <li key={index} className={"nav-li"}>
            <button
              className={"nav-link"}
              onClick={() => scrollTo(subHref)}
              style={{ color: this.props.colors[index] }}
            >
              {title}
            </button>
          </li>
        )
      } else {
        return (
          <li key={index} className={"nav-li"}>
            <Link
              className={`nav-link ${this.props.page === href ? "active-nav-link" : ""}`}
              to={href}
              onClick={() => this.props.setSection(subHref)}
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
    this.renderNavLinks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props || prevState === this.state) {
      this.renderNavLinks();
    }
  }

  render() {
    if (window.innerWidth < 1000) {
      return <NavBarMobile links={this.state.navLinks} />
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
