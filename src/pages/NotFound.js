import React from "react";
import { Link } from "react-router-dom";

export default class NotFound extends React.Component {
  render() {
    return (
      <div id={"not-found"} className={"calm-blue single-col-page"}>
        <h1>404 Not Found</h1>
        <p>
          We couldn't find the page you were looking for. If you typed a URL, make sure you typed it correctly.
          Otherwise, you may have clicked an outdated link. <Link className={"link"} to={"/"}>Click here to return home.</Link>
        </p>
      </div>
    )
  }
}