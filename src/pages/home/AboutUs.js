import React from "react";
import aboutUs from "../../assets/images/about-us-photo.png";
import AnimatedRow from "../../components/AnimatedRow";
import { Link } from "react-router-dom";

export default class AboutUs extends React.Component {
  render() {
    return (
      <div id={"about-us"} className={"section"}>
        <AnimatedRow
          bottom={window.innerWidth > 814 ? "left" : "right"}
          offset={-100}
          leftContent={<img src={aboutUs} alt={""} className={"about-us-photo"} />}
          rightContent={
            <div className={"blue-sky about-us-content"}>
              <div style={{ textAlign: "center", padding: 40 }}>
                <h3 style={{ color: "#EEF4F8" }}>about<span style={{ color: "#D34E23" }}>us</span></h3>
                <p>
                  We are a fun grassroots community with hundreds of local supporters who want to see Pete Buttigieg
                  as our next President of the United States. We are growing fast, so please join this exciting
                  movement! Whether you are just learning about Pete, or you've been on Team Pete from the beginning,
                  we hope you're ready to work with us throughout the primary season and into the general election!
                </p>
                <ul className={"center-ul"}>
                  <li><h4><a href={"https://www.mobilize.us/peteforamerica/event/106448/"} target={"_blank"}>Debate Watch Party - July 30</a></h4></li>
                  <li><h4>SJ Pride Parade - Aug 25</h4></li>
                </ul>
                <p>We organize our events through the SV for Pete Meetup.  Click below to get directed there and sign up!</p>
                <div className={"about-us-button-container"}>
                  <a href={"https://www.meetup.com/SV-for-Pete-2020/"} className={"about-us-links"} target={"_blank"}>Meetup</a>
                  <Link to={"/collateral"} className={"about-us-links"}>Explore Collateral</Link>
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}
