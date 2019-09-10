import React from "react";
import youtubeIcon from "../assets/images/icons/youtube.png";
import facebookIcon from "../assets/images/icons/facebook.png";
import twitterIcon from "../assets/images/icons/twitter.png";
import "../stylesheets/NavBarAndFooter.css";

export default class Footer extends React.Component {

  render() {
    return (
      <footer className={"strato-blue single-column row"}>
        <p className={"sans-serif"}><a href={"mailto:svpete2020@gmail.com"}>svpete2020@gmail.com</a></p>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <a href={"https://www.twitter.comn/svpete2020"} target={"_blank"}>
            <img src={twitterIcon} alt={"Twitter"} />
          </a>
          <a href={"https://www.facebook.com/groups/svforpete2020/"} target={"_blank"}>
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
    )
  }
}
