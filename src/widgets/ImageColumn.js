import React from "react";
import "../stylesheets/App.css";

const IMAGE_RATIO = 1;

export default class ImageColumn extends React.Component {
  state = {
    imageRatio: "auto 100%"
  };

  calcImageSize = () => {
    if ((window.innerWidth / 2.0) / window.innerHeight < IMAGE_RATIO) {
      this.setState({ imageRatio: "auto 100%" });
    } else {
      this.setState({ imageRatio: "100%" });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.calcImageSize);
    this.calcImageSize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calcImageSize);
  }

  HiddenImage = () => (
    window.innerWidth <= 1000 ?
      <img src={this.props.image} style={{ width: "100%", objectFit: "cover" }} alt={""} />
      : null
  );

  render() {
    return (
      <div
        className={`column background-img ${this.props.fixed && window.innerWidth > 1000 ? "fixed" : ""}`}
        style={{
          backgroundSize: this.state.imageRatio,
          backgroundImage: window.innerWidth > 1000 ? `url(${this.props.image})` : "",
          padding: "0"
        }}
      >
        <this.HiddenImage />
      </div>
    );
  }
}