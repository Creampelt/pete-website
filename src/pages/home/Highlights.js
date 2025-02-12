import React from "react";
import Slideshow from "../../components/Slideshow";
import InViewMonitor from "react-inview-monitor";

const IMAGES = require.context("../../assets/images/slideshowImages", false, /\.(png|jpe?g|svg)$/);

export default class Highlights extends React.Component {
  render() {
    return (
      <div id={"highlights"} className={"section"}>
        <InViewMonitor
          classNameNotInView={"transparent"}
          classNameInView={"opaque"}
        >
          <div className={"calm-blue single-column row"}>
            <h2>Highlights</h2>
            <div id={"media-container"} className={"row"}>
              <iframe
                src={"https://www.youtube.com/embed/BW_JMaToRCw"}
                allow={"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"}
                allowFullScreen
                className={"media"}
                title={"Silicon Valley for Pete Watch Party"}
              />
              <Slideshow images={IMAGES} />
            </div>
          </div>
        </InViewMonitor>
      </div>
    )
  }
}
