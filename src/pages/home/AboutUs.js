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
	if (url != null) {
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
          bottom={"left"}
          offset={100}
          leftContent={
            <img
              src={aboutUs}
              alt={""}
              style={{ width: "50vw", height: "40vw", objectFit: "cover", position: "absolute", marginLeft: "30px" }}
            />
          }
          rightContent={
            <div className={"blue-sky"} style={{ width: "60vw" }}>
              <div style={{ textAlign: "center", padding: 40 }}>
                <h3 style={{ color: "#EEF4F8" }}>about<span style={{ color: "#D34E23" }}>us</span></h3>
                <p>
                  We're a grassroots organization supporting the Pete for America campaign.  Our focus is from Palo Alto to
                  San Jose — though anyone is welcome.  If you're excited about Pete and want get involved, we have a number
                  of upcoming events such as:
                </p>
              <ul className={"center-ul"} id="event-list"></ul>
                <p>We organize our events through the SV for Pete Meetup.  Click below to get directed there and sign up!</p>
                <div className={"about-us-button-container"}>
                  <a href={"https://www.meetup.com/SV-for-Pete-2020/"} className={"about-us-links"} target={"_blank"}>Meetup</a>
                  <a href={"https://www.meetup.com/SV-for-Pete-2020/"} className={"about-us-links"}>Explore Collateral</a>
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}
