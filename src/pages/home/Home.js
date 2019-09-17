import React from "react";
import petePortrait from "../../assets/images/pete.png";
import Form from "../../components/Form";
import MoveIn from "../../components/MoveIn";

export default class Home extends React.Component {
  render() {
    return (
      <div id={"home"} className={"section"}>
        <div className={"row strato-blue"}>
            <MoveIn from={"left"}>
              <img src={petePortrait} id={"pete-portrait"} alt={""} className={"column"} />
            </MoveIn>
          <div className={"column"}>
            <div className={"column-content"}>
              <h1>Silicon Valley<br />for <span style={{ color: "#f2ba42" }}>Pete</span></h1>
              <p>
                Sign up here to receive our newsletter and occasional emails about local upcoming events such as
                volunteer opportunities, local Pete appearances, and joining our fun MeetUp events like debate
                night watch parties.
              </p>
            </div>
            <MoveIn from={"right"}>
              <Form />
            </MoveIn>
          </div>
        </div>
      </div>
    );
  }
}
