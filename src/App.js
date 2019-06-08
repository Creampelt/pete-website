import React from "react";
import "./stylesheets/App.css";
import NavBar from "./widgets/NavBar";
import Slideshow from "./widgets/Slideshow";
import "./stylesheets/action-network-styles.css";
import youtubeIcon from "./assets/images/icons/youtube.png";
import facebookIcon from "./assets/images/icons/facebook.png";

const IMAGE_RATIO = 1;
const NAVBAR_HEIGHT = 81;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideshowImages: [],
      imageRatio: "auto 100%",
      navColors: ["#F2BA42", "#EEF4F8", "#EEF4F8"]
    };
    this.homeRef = React.createRef();
    this.aboutRef = React.createRef();
    this.meetRef = React.createRef();
  }

  calcImageSize = () => {
    if ((window.innerWidth / 2.0) / window.innerHeight < IMAGE_RATIO) {
      this.setState({ imageRatio: "auto 100%" });
    } else {
      this.setState({ imageRatio: "50%" });
    }
  };

  calcScrollPos = () => {
    if (this.meetRef.current.getBoundingClientRect().top <= NAVBAR_HEIGHT) {
      this.setState({ navColors: ["#EEF4F8", "#EEF4F8", "#F2BA42"] });
    } else if (this.aboutRef.current.getBoundingClientRect().top <= NAVBAR_HEIGHT) {
      this.setState({ navColors: ["#EEF4F8", "#F2BA42", "#EEF4F8"] });
    } else {
      this.setState({ navColors: ["#F2BA42", "#EEF4F8", "#EEF4F8"] });
    }
  };

  componentDidMount() {
    let r = require.context('./assets/images/slideshow_images/', false, /\.(png|jpe?g|svg)$/);
    let slideshowImages = r.keys().map(item => r(item));
    this.setState({ slideshowImages });
    window.addEventListener("resize", this.calcImageSize);
    window.addEventListener("scroll", this.calcScrollPos);
    this.calcImageSize();
    this.calcScrollPos();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calcImageSize);
    window.removeEventListener("scroll", this.calcScrollPos);
  }

  render() {
    return (
      <div className={"App"}>
        <NavBar colors={this.state.navColors} />
        <div className={"row river-blue"} id={"home"} ref={this.homeRef}>
          <div className={"column background-img fixed"} id={"pete-portrait"} style={{ backgroundSize: this.state.imageRatio }} />
          <div className={"column"}>
            <h1>Silicon Valley for Pete</h1>
            <h4 style={{ marginTop: "auto", marginBottom: "0" }}>Get involved today!</h4>
            <p>
              We are a grassroots organization supporting Pete Buttigieg for President in 2020. Getting involved is
              easy. Check all the options you are interested in and we'll provide details once we know you're in. If
              you just want to be in the loop and kept informed - that's okay too!
            </p>
            <div id='can-form-area-join-silicon-valley-for-pete' style={{ width: "100%" }} />
          </div>
        </div>
        <div className={"row rust-belt"}>
          <div className={"column"}>
            <h4 style={{ marginLeft: "60px" }}>To vote in the 2020 California primary, you must register by February 17, 2020</h4>
          </div>
          <div className={"column"}>
            <a id={"register-button"} href={"https://registertovote.ca.gov"}>Register to Vote</a>
          </div>
        </div>
        <div className={"row blue-sky"} id={"about-us"} ref={this.aboutRef}>
          <div className={"column background-img"} id={"about-us-photo"} />
          <div className={"column"} style={{ textAlign: "center" }}>
            <h3 style={{ color: "#EEF4F8" }}>about<span style={{ color: "#D34E23" }}>us</span></h3>
            <p>
              We're a grassroots organization supporting the Pete for America campaign.  Our focus is from Palo Alto to
              San Jose — though anyone is welcome.  If you're excited about Pete and want get involved, we have a number
              of upcoming events such as:
            </p>
            <ul className={"center-ul"}>
              <li><h4>Chapter Meeting - May 14</h4></li>
              <li><h4>SFPride Parade - Jun 30</h4></li>
              <li><h4>SJPride Parade - Aug 24</h4></li>
            </ul>
            <p>We organize our events through the SV for Pete Meetup.  Click below to get directed there and sign up!</p>
            <div className={"about-us-button-container"}>
              <a href={"https://www.meetup.com/SV-for-Pete-2020/"} className={"about-us-links"} target={"_blank"}>Meetup</a>
              <a href={"https://www.meetup.com/SV-for-Pete-2020/"} className={"about-us-links"}>Explore Collateral</a>
            </div>
          </div>
        </div>
        <div className={"calm-blue single-column row"}>
          <h2>Highlights</h2>
          <div className={"row media-container"}>
            <iframe src="https://www.youtube.com/embed/BW_JMaToRCw"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={"media"}
                    title={"Silicon Valley for Pete Watch Party"}
            />
            <iframe src="https://www.youtube.com/embed/RXFFnlXVQSQ"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={"media"}
                    title={"First Chapter Meeting"}
            />
            <Slideshow images={this.state.slideshowImages} />
          </div>
        </div>
        <div className={"heartland-yellow single-column row"} id={"meet-pete"} ref={this.meetRef}>
          <h2>Meet Pete</h2>
          <div className={"row"}>
            <div className={"column"}>
              <p style={{ textAlign: "left" }}>
                Want to learn more about Pete and the campaign? Start with the&nbsp;
                <a target={"_blank"} href={"https://peteforamerica.com"}>Pete for America website</a> and see how he's
                structuring a values-based campaign. Pete is fabulous in an interview setting so check out&nbsp;
                <a target={"_blank"} href={"https://meetpete.org"}>meetpete.org</a> where you can search video clips of
                Pete talking specifics on hundreds of different topics. And of course check out social media.
              </p>
            </div>
            <div
              className={"fb-page column"}
              data-href={"https://www.facebook.com/petebuttigieg1/"}
              data-tabs={"timeline"}
              data-width={""}
              data-height={"100%"}
              data-small-header={"false"}
              data-adapt-container-width={"true"}
              data-hide-cover={"false"}
              data-show-facepile={"true"}
            >
              <blockquote cite="https://www.facebook.com/facebook" className="fb-xfbml-parse-ignore">
                <a href="https://www.facebook.com/petebuttigieg1/">Pete Buttigieg</a>
              </blockquote>
            </div>
            <div className={"powr-twitter-feed column"} id={"98da59ea_1559595958"} />
          </div>
        </div>
        <footer className={"strato-blue single-column row"}>
          <p className={"sans-serif"}><a href={"mailto:svforpete2020@gmail.com"}>svforpete2020@gmail.com</a></p>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <a href={"https://www.youtube.com/UCKQoHA9AvnJRWkxcOkXHHyw"} target={"_blank"}>
              <img src={youtubeIcon} alt={"YouTube"} />
            </a>
            <a href={"https://www.facebook.com/petebuttigieg1/"} target={"_blank"}>
              <img src={facebookIcon} alt={"Facebook"} />
            </a>
          </div>
          <p>
            Silicon Valley for Pete and this website is a grassroots volunteer effort with no formal affiliation to Pete
            Buttigieg for America 2020.This organization and website has not been paid for or endorsed by Pete for
            America. We are not a non-profit, Super PAC, or special interest group.
          </p>
          <p>&copy;2019 by Silicon Valley for Pete 2020</p>
        </footer>
      </div>
    );
  }
}
