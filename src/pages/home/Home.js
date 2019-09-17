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
                We are a grassroots organization supporting Pete Buttigieg for President in 2020. Getting involved is
                easy. Check all the options you are interested in and we'll provide details once we know you're in. If
                you just want to be in the loop and kept informed - that's okay too!
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
