import React from "react";

export default class RegisterToVote extends React.Component {
  render() {
    return (
      <div id={"register-to-vote"} className={"row rust-belt"}>
        <div className={"column"}>
          <h4 id={"register-text"}>To vote in the 2020 California primary, you must register by February 17, 2020</h4>
        </div>
        <div className={"column"}>
          <a id={"register-button"} href={"https://registertovote.ca.gov"}>Register to Vote</a>
        </div>
      </div>
    )
  }
}