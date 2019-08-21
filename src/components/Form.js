import React from "react";
import "../stylesheets/App.css";

export default class Form extends React.Component {
  render() {
    return (
      <div id={"get-involved-form"} className={"heartland-yellow"}>
        <h4>Get involved today</h4>
        <form>
          <div className={"large-col"}>
            <input type={"text"} placeholder={"Full name*"} required />
            <input type={"text"} placeholder={"Email*"} required />
          </div>
          <div className={"small-col"}>
            <input type={"text"} placeholder={"Zip code*"} required />
            <input type={"submit"} value={"Submit"} className={"submit"} />
          </div>
        </form>
      </div>
    )
  }
}