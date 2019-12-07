import React from "react";
import petePortrait from "../../assets/images/pete.png";
import MoveIn from "../../components/MoveIn";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let db = firebase.firestore();

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    let eventsRef = db.collection('events');

    eventsRef.get().then(snapshot => {
      let events = [];
      // Build an events array by reading in each element from firebase
      // Each array element contains the name and date, along with a possible URL.
      // We're building this array so we can sort it before rending the events.
      snapshot.forEach(doc => {
        let name = doc.get("name");
        let url = doc.get("URL");
        let date = doc.get("date");
        let item = { name, url, date };
        events.push(item);
      });

      // Sort the array.  Use Date.parse to allow a comparison.
      events.sort((first, second) => {
        return Date.parse(first.date) - Date.parse(second.date);
      });

      // Render the events from the now sorted event list.
      let eventList = document.getElementById('event-list');
      events.forEach(item => {
        let entry = document.createElement('li');
        let text = item.name + ' — ' + item.date;
        if (item.url != null && item.url !== '') {
          let event = document.createElement('a');
          event.textContent = text;
          event.href = item.url;
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
      <div id={"home"} className={"section"}>
        <div className={"row strato-blue"}>
            <MoveIn from={"left"}>
              <img src={petePortrait} id={"pete-portrait"} alt={""} className={"column"} />
            </MoveIn>
          <div className={"column"}>
            <div className={"column-content"}>
              <h1>Silicon Valley<br />for <span style={{ color: "#f2ba42" }}>Pete</span></h1>
              <p>
                We are a fun grassroots community with hundreds of local supporters who want to see Pete Buttigieg
                as our next President of the United States. We are growing fast, so please join this exciting
                movement! Whether you are just learning about Pete, or you've been on Team Pete from the beginning,
                we hope you're ready to work with us throughout the primary season and into the general election!
              </p>
              <h4>Upcoming Events</h4>
              <ul className={"center-ul"} id="event-list"></ul>
              <h4>Get Involved</h4>
              <p>
                Sign up below to get our newsletter and occasional emails. Join the SV for
                Pete 2020 group on Meetup.com. We organize all of our events here. Follow us on social media for the
                most up-to-date information.
              </p>
              <div className={"home-button-container"}>
                <a href={"https://www.meetup.com/SV-for-Pete-2020/"} className={"home-links"} target={"_blank"}>
                  Meetup
                </a>
                <a href={"https://www.twitter.com/SVforButtigieg"} className={"home-links"} target={"_blank"}>
                  Twitter
                </a>
                <a href={"https://www.facebook.com/groups/svforpete2020/"} className={"home-links"} target={"_blank"}>
                  Facebook
                </a>
              </div>
            </div>
          </div>
      </div>
      </div>
    );
  }
}
