import React from "react";
import ImageColumn from "../../widgets/ImageColumn";
import aboutUs from "../../assets/images/about-us-photo.png";

export default class AboutUs extends React.Component {
  render() {
    return (
      <div id={"about-us"} className={"row blue-sky"}>
        <ImageColumn image={aboutUs} />
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
    )
  }
}