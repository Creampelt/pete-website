import React from "react";
import animateScrollTo from "animated-scroll-to";
import sizes from "../constants/Sizes";
import options from "../constants/ScrollToOptions";

function scrollTo(link) {
  animateScrollTo(document.querySelector(link), options);
}

export default class SkeletonPage extends React.Component {
  calcScrollPos = () => {
    let refs = this.props.refs[this.props.page];
    let index = refs.filter((ref) => ref).length - 1;
    for (let i = refs.length - 1; i > 0; i--) {
      let ref = refs[i];
      if (ref) {
        if (ref.current && ref.current.getBoundingClientRect().top <= sizes.navBarHeight) {
          this.props.setActiveColor(this.props.page, index);
          return;
        }
        index--;
      }
    }
    this.props.setActiveColor(this.props.page, 0);
  };

  componentDidMount() {
    window.addEventListener("scroll", this.calcScrollPos);
    this.calcScrollPos();
    this.props.setPage(this.props.page);
    if (this.props.section) {
      scrollTo(this.props.section);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.prevColor === nextProps.prevColor;
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.calcScrollPos);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}