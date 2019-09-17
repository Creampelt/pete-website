import React from "react";
import aboutUs from "../../assets/images/about-us-photo.png";
import AnimatedRow from "../../components/AnimatedRow";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

let db = firebase.firestore();

export default class AboutUs extends React.Component {
  constructor(props) {
    super(props);

    let eventsRef = db.collection('events');

      eventsRef.get().then(snapshot => {
          snapshot.forEach(doc => {
              let eventList = document.getElementById('event-list');
              let name = doc.get("name");
              let url = doc.get("URL");
              let date = doc.get("date");
              let entry = document.createElement('li');
              let text = name + ' — ' + date;
              if (url != null && url !== '') {
                  let event = document.createElement('a');
                  event.textContent = text;
                  event.href = url;
                  entry.appendChild(event);
              } else {
                  let event = document.createTextNode(text);
                  entry.appendChild(event);
              }
              eventList.appendChild(entry);
          });
      });
  }

  render() {
    return (
      <div id={"about-us"} className={"section"}>
        <AnimatedRow
          bottom={window.innerWidth > 814 ? "left" : "right"}
          offset={-100}
          leftContent={<img src={aboutUs} alt={""} className={"about-us-photo"} />}
          rightContent={
            <div className={"blue-sky about-us-content"}>
              <div style={{ textAlign: "center", padding: 40 }}>
                <h3 style={{ color: "#EEF4F8" }}>about<span style={{ color: "#D34E23" }}>us</span></h3>
                <p>
                  We are a fun grassroots community with hundreds of local supporters who want to see Pete Buttigieg
                  as our next President of the United States. We are growing fast, so please join this exciting
                  movement! Whether you are just learning about Pete, or you've been on Team Pete from the beginning,
                  we hope you're ready to work with us throughout the primary season and into the general election!
                </p>
              <ul className={"center-ul"} id="event-list"></ul>
                <p>We organize our events through the SV for Pete Meetup.  Click below to get directed there and sign up!</p>
                <div className={"about-us-button-container"}>
                  <a href={"https://www.meetup.com/SV-for-Pete-2020/"} className={"about-us-links"} target={"_blank"}>Meetup</a>
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}
