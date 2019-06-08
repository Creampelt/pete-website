import React from 'react';
import '../stylesheets/nav-bar.css';
import bannerLogo from "../assets/images/banner-logo-pete-bridge-2020.png";
import animateScrollTo from 'animated-scroll-to';
import NavBarMobile from "./NavBarMobile";

const PAGES = [
  { title: "Home", href: "#home" },
  { title: "About Us", href: "#about-us" },
  { title: "Meet Pete", href: "#meet-pete" },
  { title: "Collateral", href: "#" },
];

const OPTIONS = {
  offset: -79
};

function scrollTo(link) {
  if (link[0] === "#") {
    animateScrollTo(document.querySelector(link), OPTIONS);
  }
}

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.navLinks = null;
  }

  renderNavLinks() {
    this.navLinks = PAGES.map(({ title, href }, index) => (
      <li key={index}>
        <a
          href={href[0] !== "#" ? href : null}
          onClick={href[0] === "#" ? (() => scrollTo(href)) : null}
          style={{ color: index < this.props.colors.length && window.innerWidth > 1000 ? this.props.colors[index] : "#EEF4F8" }}
        >
          {title}
        </a>
      </li>
    ))
  };

  componentDidMount() {
    this.renderNavLinks();
  }

  componentDidUpdate() {
    this.renderNavLinks();
  }

  render() {
    if (window.innerWidth < 1000) {
      return <NavBarMobile links={this.navLinks} />
    } else {
      return (
        <div className={"nav-bar"}>
          <img id={"banner-logo"} src={bannerLogo} alt={"Pete for America Logo"}/>
          <ul>{this.navLinks}</ul>
        </div>
      );
    }
  }
}
