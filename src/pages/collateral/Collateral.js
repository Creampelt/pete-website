import React from "react";
import "../../stylesheets/App.css";

const EnglishSpanishButtons = ({ engHref, spanHref }) => (
  <div className={"language-button-container"}>
    <a className={"language-links"} target={"_blank"} href={engHref}><p>English</p></a>
    <a className={"language-links"} target={"_blank"} href={spanHref}><p>Español</p></a>
  </div>
);

export default class Collateral extends React.Component {
  render() {
    return (
      <div id={"collateral"} className={"calm-blue single-col-page"}>
        <h2 style={{ marginTop: "0" }}>Fliers and Collateral</h2>
        <div>
          <h4>Flier used at Morgan Hill Mushroom Mardi Gras</h4>
          <div className={"collat-row"}>
            <p>
              This flier was used at an event that had a mix of demographics and voting tendencies (i.e. red/blue)
              instead of a solid democratic base.
            </p>
            <EnglishSpanishButtons
              engHref={"https://docs.wixstatic.com/ugd/a98938_bbc002f4b50b4beda2fec6475da4038d.pdf"}
              spanHref={"https://docs.wixstatic.com/ugd/a98938_8fa17a38098e4cbcbe5d0254c45f395a.pdf"}
            />
          </div>
        </div>
      </div>
    )
  }
}