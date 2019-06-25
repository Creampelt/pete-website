import React from "react";

export default class MeetPete extends React.Component {
  render() {
    return (
      <div className={"heartland-yellow single-column row"} id={"meet-pete"}>
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
    )
  }
}