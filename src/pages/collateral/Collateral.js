import React from "react";
import "../../stylesheets/App.css";
import flyer_morgan_hill_en from "../../assets/downloads/flyer_morgan_hill_en.pdf";
import flyer_morgan_hill_es from "../../assets/downloads/flyer_morgan_hill_es.pdf";
import flyer_recruit_en from "../../assets/downloads/flyer_recruit_en.pdf";

const EnglishSpanishButtons = ({ engHref, spanHref }) => (
  <div className={"language-button-container"}>
    <a className={"language-links"} target={"_blank"} href={engHref}><p>English</p></a>
    <a className={"language-links"} target={"_blank"} href={spanHref}><p>Español</p></a>
  </div>
);

const EnglishOnlyButton = ({ engHref }) => (
    <div className={"language-button-container"}>
            <a className={"language-links"} target={"_blank"} href={engHref}><p>English</p></a>
            <a className={"language-links-invisible"} target={"_blank"} href={"nothing"} ><p>Español</p></a> 
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
              This flier was used at an event that had a mix of demographics and voting tendencies (e.g. red/blue)
              instead of a solid democratic base.
            </p>
            <EnglishSpanishButtons
              engHref={flyer_morgan_hill_en}
              spanHref={flyer_morgan_hill_es}
            />
          </div>
          <h4>Recruitment Flyer</h4>
            <div className={"collat-row"}>
              <p>
               Flyer used to recruit new members & event signups. Distribute these to recruit members to our events.
              </p>
               <EnglishOnlyButton
                    engHref={flyer_recruit_en}
                />
            </div>
        </div>
      </div>
    )
  }
}
