import React from "react";
import "../stylesheets/App.css";
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';

let firebase = require('firebase');
let firebaseui = require('firebaseui');
let db = firebase.firestore();

export default class ManageLogin extends React.Component {
    loginUI() {
        let uiConfig = {
            signInSuccessUrl: 'manage',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ]
        };

        // Initialize the FirebaseUI Widget using Firebase.
        let ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#management-auth-container', uiConfig);
    }

    render() {
        this.loginUI();
        return (
            <div>
                <h1>Login to Management Console</h1>
                <div id="management-auth-container"></div>
            </div>
        )
    }
}

export class Manage extends React.Component {
    state = {
        loggedOut: false,
        events: [
            {name: 'March for frogs', date: '25 Aug', url: 'http://www.google.com' },
            {name: 'Rally in the Park', date: '26 Oct', url: '' },
            {name: 'Chapter meeting', date: '14 Oct', url: 'http://www.cnn.com' }
            ]
    };

    constructor(props) {
        super(props);
        this.getEventsFromTable();
    }

    getEventsFromTable = async () => {
        let eventList = [];

        let eventsRef = db.collection('events');
        let snapshot = await eventsRef.get();
        snapshot.forEach(doc => {
            let name = doc.get("name");
            let url = doc.get("URL");
            let date = doc.get("date");

            if (url == null) {
                url = '';
            }
            eventList.push({ name: name, date: date, url: url });
        });

        this.setState({ events: eventList });
    };

    writeNewTable = async (events) => {
        // First delete everything in the collection.
        let eventsRef = db.collection('events');
        let snapshot = await eventsRef.get();
        snapshot.forEach(doc => {
            let ref = eventsRef.doc(doc.id);
            ref.delete();
        });

        let cleanEvents = [];

        events.forEach((event) => { if (event.name !== '') { cleanEvents.push(event) }});
        await cleanEvents.forEach(async (event) => {
            if (event.name === '') {
                return;
            }
            await eventsRef.add({
                name: event.name,
                date: event.date,
                URL: event.url
            })
        });

        return cleanEvents;
    };

    DrawPage = ({loggedOut}) => {
        return (
            loggedOut
            ? <p> You are logged out. </p>
            :  <div id={"collateral"} className={"calm-blue single-col-page"}>
                    <h2 style={{ marginTop: "0" }}>SVForPete Admin Page</h2>
                    <div>
                        <h4>Actions</h4>
                        <ul id={"manage-widgets"}>
                            <li><input type={"button"} value={"Log out"} onClick={this.logOut}/></li>
                            <li><input type={"button"} value={"Download Membership Report"}/></li>
                            <li><input type={"button"} value={"Submit"} onClick={this.submit}/></li>
                        </ul>
                        <h4> Event List </h4>
                        <div>
                            <this.SortableList items={this.state.events} onSortEnd={this.onSortEnd} useDragHandle/>
                        </div>
                        <input type={'button'} value={'Add Event'} onClick={this.addEvent}/>
                    </div>
                </div>
        );
    };

    logOut = () => {
        firebase.auth().signOut().then(() => {
            console.log("Signed out.");
            this.setState({loggedOut: true });
        }, function(error) {
            console.err(`Error logging out: ${error}`);
        });
    };

    // Callback function when the submit button is pushed.  Should take the final results
    // and push them back to firebase.
    submit = () => {
        this.writeNewTable(this.state.events).then((cleanedTable) => {
            this.setState({ events: cleanedTable });
        });
    };

    addEvent = () => {
        let newEvents = Array.from(this.state.events);
        newEvents.push({ name: '', date: '', url: ''});
        this.setState({ events: newEvents });
    };

    // Called when the list order is changed
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({ events: arrayMove(this.state.events, oldIndex, newIndex) });
    };

    DragHandle = SortableHandle(() => <span>::</span>);


    /*                           onChange={() => changeFunc(`event-input-${uid}`)}/> */
    /*                          onChange={() => changeFunc(`event-input-${uid}`)}/> */
    SortableItem = SortableElement(({uid, value, changeFunc}) => {
        return (
                <li className={'manage-event-item'}>
                    <this.DragHandle/>
                    <input id={`event-input-${uid}-name`} type="text" value={value.name}
                           minLength="4" maxLength="36" size="24"
                           onChange={() => changeFunc(`event-input-${uid}`)}/>
                    <input id={`event-input-${uid}-date`} type="text" value={value.date}
                           minLength="4" maxLength="16" size="12"
                           onChange={() => changeFunc(`event-input-${uid}`)}/>
                    <input id={`event-input-${uid}-url`} type="text" value={value.url}
                           minLength="4" maxLength="128" size="36"
                           onChange={() => changeFunc(`event-input-${uid}`)}/>
                </li>
            )
        }
    );

    SortableList = SortableContainer(({items}) => {
        return (
            <ul id={'manage-event-list'}>
                {items.map((value, index) => (
                    <this.SortableItem key={`event-input-${index}`} index={index} uid={index} value={value}
                                  changeFunc={(listElementPrefix) => {
                                      let name = document.getElementById(`${listElementPrefix}-name`).value;
                                      let date = document.getElementById(`${listElementPrefix}-date`).value;
                                      let url = document.getElementById(`${listElementPrefix}-url`).value;
                                      let newState = Array.from(this.state.events);
                                      newState[index] = { name: name, date: date, url: url };
                                      this.setState({ events: newState });
                                  }}/>
                ))}
            </ul>
        );
    });

    render() {
        return (
            <this.DrawPage loggedOut={this.state.loggedOut} />
        )
    }
}





