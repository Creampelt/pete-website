import React from "react";
import ImageColumn from "../../widgets/ImageColumn";
import petePortrait from "../../assets/images/pete.png";

export default class Home extends React.Component {
  render() {
    return (
      <div id={"home"} className={"row river-blue"}>
        <ImageColumn fixed image={petePortrait} />
        <div className={"column"}>
          <h1>Silicon Valley for Pete</h1>
          <h4 style={{ marginTop: "auto", marginBottom: "0" }}>Get involved today!</h4>
          <p>
            We are a grassroots organization supporting Pete Buttigieg for President in 2020. Getting involved is
            easy. Check all the options you are interested in and we'll provide details once we know you're in. If
            you just want to be in the loop and kept informed - that's okay too!
          </p>
          <div id={'can-form-area-join-silicon-valley-for-pete'} style={{ width: "100%" }} />
        </div>
      </div>
    )
  }
}