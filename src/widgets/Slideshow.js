import React from 'react';
import "../stylesheets/slideshow.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowRight, faArrowLeft);

export default class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      translateValue: 0
    }
  }

  goToPrevSlide = () => {
    if (this.state.currentIndex === 0) {
      console.log(this.state.translateValue);
      return this.setState({
        currentIndex: this.props.images.length - 1,
        translateValue: this.slideWidth() * -(this.props.images.length - 1)
      })
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }))
  };

  goToNextSlide = () => {
    console.log(this.state.translateValue);
    // Exiting the method early if we are at the end of the images array.
    // We also want to reset currentIndex and translateValue, so we return
    // to the first image in the array.
    if (this.state.currentIndex === this.props.images.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      })
    }

    // This will not run if we met the if condition above
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue - this.slideWidth()
    }));
  };

  slideWidth = () => {
    return document.querySelector('.slide').clientWidth
  };

  render() {
    return (
      <div className="slider">
        <div className="slider-wrapper"
             style={{
               transform: `translateX(${this.state.translateValue}px)`,
               transition: 'transform ease-out 0.45s'
             }}>
          {
            this.props.images.map((image, i) => (
              <Slide key={i} image={image} />
            ))
          }
        </div>
        <LeftArrow
          goToPrevSlide={this.goToPrevSlide}
        />
        <RightArrow
          goToNextSlide={this.goToNextSlide}
        />
      </div>
    );
  }
}


const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 60%'
  };
  return <div className="slide" style={styles} />
};


const LeftArrow = (props) => {
  return (
    <div className="backArrow arrow" onClick={props.goToPrevSlide}>
      <FontAwesomeIcon icon={"arrow-left"} className={"fa fa-2x"} />
    </div>
  );
};


const RightArrow = (props) => {
  return (
    <div className="nextArrow arrow" onClick={props.goToNextSlide}>
      <FontAwesomeIcon icon={"arrow-right"} className={"fa fa-2x"} />
    </div>
  );
};