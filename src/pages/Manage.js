import React from "react";
import "../stylesheets/App.css";
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Parser } from 'json2csv';
import firebase from 'firebase/app';
//const { Parser } = require('json2csv');
//const firebase = require('firebase');
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

/**
 * Manage component implements the entire admin management console.  Necessary behavior is:
 * -- Authenticate user on access to ensure they are in the "manager" role as defined in Firestore.
 * -- Allow download of contact information submitted on the website.
 * -- Edit and update the list of events as shown on the AboutUs page of the website.
 */
export class Manage extends React.Component {
    state = {
        // Authentication status of the user, and the email address of the user if authenticated.
        auth: {
            authenticated: false,
            user: '',
            token: null
        },
        // List of events to display on the website.  Will be downloaded on initialization from Firestore.
        // Each event is a record of the form { name: string, date: string, url: string (possibly null) }
        events: [],
        // Two possible error states to reflect when rendering the page.
        // "download" means the user has tried to download the list of contact information and isn't authorized.
        // "submit" means the user has modified the list of events and tried to submit the new list and isn't
        // authorized.
        errors: {
            download: false,
            submit: false
        }
    };

    // Build the Manage component.  Ensure the user is authorized, and then load initial event data
    // from firestore.
    constructor(props) {
        super(props);
        this.loginUI();
        this.getEventsFromTable();
    }

    /**
     * loginUI() Runs the authentication flow using Google Access authentication.
     * @returns {Promise<void>}
     */
    async loginUI() {
        try {
            let result = await firebase.auth().signInWithPopup(provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            // ...
            console.log(`[Manage.loginUI] Logged-in as user ${user.email}`);
            this.setState({auth : { authenticated: true, user: user, token: token }});
        } catch (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            console.error(`Error code ${errorCode} logging in ${errorMessage} for user ${email}`);
        }
    };

    /**
     * buildReport() - Creates a (downloadable) csv report for all all contacts entered on the website.
     * First build a JSON object representation for the report from the data in Firebase.  Then
     * convert that JSON representation to csv.
     *
     * @returns {Promise<String>}
     */
     buildReport = async () => {
        let snapshot = await db.collection('membership').get();
        let report = '';

        snapshot.forEach(doc => {
            let name = doc.get('name');
            let email = doc.get('email');
            let zip = doc.get('zip');

            if (report === '') {
                report += `{ "name": "${name}",  "email" :  "${email}", "zip" : "${zip}" }`;
            } else {
                report += `, { "name": "${name}",  "email" :  "${email}", "zip" : "${zip}" }`;
            }
        });
        report = `[ ${report} ]`;

         // Docs for json2csv - https://github.com/zemirco/json2csv
        const fields = ['name', 'email', 'zip'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(JSON.parse(report));

        return csv;
    };

    /**
     * downloadReport() - Trigger a download of the contact report.
     * First generate the csv report.  Then create a dummy link for the download with a generated
     * object that represents that csv.  Fake a "click" on that link to trigger the download.
     */
    downloadReport = () => {
        const MIME_TYPE = "text/csv";

        this.buildReport().then((data) => {
            const filename = 'membership.csv'
            const blob = new Blob([data], {type: MIME_TYPE});
            const url = URL.createObjectURL(blob);
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        }).catch((error) => {
            // Should be here due to insufficient permissions.
            this.setState({ errors: { download: true } });
            console.error(error);
        });

    };

    /**
     * getEventsFromTable() - Download from Firebase all the current event information.
     * Once downloaded, we store this data in the "events" portion of the component state.
     *
     * @returns {Promise<void>}
     */
    async getEventsFromTable() {
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
            eventList.push({name: name, date: date, url: url});
        });

        this.setState({events: eventList});
    };

    /**
     * writeNewTable(events) - Given a set of events, write them back to firebase.
     * We overwrite the existing collection of events in Firebase with a completely new collection.  Thus
     * first, all existing events in Firebase must be deleted.
     * One the list is deleted, a the events list is scrubbed of any events with no title.
     * That cleansed list is then written back to Firebase.  See comments below for how we ensure
     * synchronous behavior for some of these actions.
     *
     * @param events - New event list to replace the existing one in Firebase.
     * @returns {Promise<Array>}
     */
    writeNewTable = async (events) => {
        // First delete everything in the collection.
        let eventsRef = db.collection('events');
        let snapshot = await eventsRef.get();

        // Create an array of Promises so that we can ensure all deletion before
        // adding in cleaned array.
        // Its a hack because snapshot only supports forEach, not map - so
        // we create an append and push each promise into the array.
        let delPromise = [];
        snapshot.forEach((doc) => {
            let ref = eventsRef.doc(doc.id);
            delPromise.push(ref.delete());
        });

        // If the user doesn't have access to delete (e.g. not a manager) then
        // all of these promises should throw an exception which is caught above
        // this method.
        await Promise.all(delPromise);

        let cleanEvents = [];

        // Create the cleansed list.  We use forEach
        // instead of map because we explicitly want to skip
        // those entries where the event name is empty (vs.create 1:1 as a map).
        events.forEach((event) => {
            if (event.name !== '') {
                cleanEvents.push(event)
            }
        });

        // Write the cleansed list to Firebase.  Note that this has some asynchronous behavior
        // that could lead to a bug but in practice seems okay.  If it breaks we can
        // do something similar to what we did with delete and a Promise.all().
        cleanEvents.forEach(async (event) => {
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

    /**
     * submit() - Callback function when the submit button is pushed.
     * Takes the final results and push them back to firebase.
     * If an exception is thrown in this process we know the user didn't have authorization to submit the list.
     * Note the error in the state so we can display the error properly.
     */
    submit = () => {
        this.writeNewTable(this.state.events).then((cleanedTable) => {
            this.setState({ events: cleanedTable });
        }).catch((error) => {
            //Should end up here due to lack of data access in Firebase.
            //Anything else is a true error.
            //TODO(@sturman): Do the actual comparison so we know its a permissions error.
            console.log(`[Manage.submit] This should be a permissions error. \n ${error}`);
            this.setState({ errors: { submit: true }});
        });
    };

    /**
     * addEvent() - Create a new (blank) event in the event list.
     * To safely create this new event, we clone the list of events. Since the individual events
     * will not be modified here, a shallow clone is safe.
     * Create the new event at the end of the list of events and update the state.
     */
    addEvent = () => {
        let newEvents = Array.from(this.state.events);
        newEvents.push({ name: '', date: '', url: ''});
        this.setState({ events: newEvents });
    };

    /**
     * deleteEvent() - Delete a specified event from the event list.
     * To safely create this new event, we clone the list of events. Since the individual events
     * will not be modified here, a shallow clone is safe.
     * The event to be deleted is removed adn the state updated.
     *
     * @param index - Index of the event to be deleted.
     */
    deleteEvent = (index) => {
        let newEvents = Array.from(this.state.events);
        newEvents.splice(index,1);
        this.setState( { events: newEvents });
    };

    /**
     * onSortEnd() - Called to update the state with a drag/drop operation on the list order is complete.
     * Using arrayMove (which creates a copy of the array with the move in effect) update the
     * state of the Component.
     *
     * @param oldIndex - old index of the item dragged.
     * @param newIndex - new index for the item dragged.
     */
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({ events: arrayMove(this.state.events, oldIndex, newIndex) });
    };

    // Hamburger draghandle for drag/drop.  Is empty because we use CSS and a gradient to create
    // the necessary graffic.
    DragHandle = SortableHandle(() => <span className={'drag-handle'}></span>);

    /**
     * SortableItem will represent each event item in the sortable (draggable) list.
     * @type {React.ComponentClass<any>}
     */
    SortableItem = SortableElement(({uid, value, changeFunc}) => {
        return (
                <div>
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
                           <input type={"button"} value={"Delete"} onClick={() => this.deleteEvent(uid)}/>
                </div>
            )
        }
    );

    /**
     * SortableList contains a set of SortableItems, one for each event in the list.
     * Each item in the list must have a changefunction to be called when an item is moved.
     * @type {React.ComponentClass<any>}
     */
    SortableList = SortableContainer(({items}) => {
        return (
            <div id={'manage-event-list'}>
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
            </div>
        );
    });

    /**
     * ErrorMsg(props) - Based-on the props, display an error message next to a manager action button.
     *
     * @param props -= Looks specifically at the 'cond' action (true for an error), and the children (text);
     * @returns {null|*}
     */
    ErrorMsg = (props) => {
        let cond = props.cond;
        let text = props.children;

        if (cond) {
            return (<span className={'error-msg'}>{text}</span>);
        } else return null;
    };

    render() {
        if (!this.state.auth.authenticated) {
            return (
                <div id={"admin"} className={"calm-blue single-col-page"}>
                    <h2 style={{marginTop: "0"}}>SVForPete Admin</h2>
                    <span className={"error-msg"}>Error: You are not authorized to access this page</span>
                </div>
            );
        } else {
            return (
                <div id={'admin'} className={"calm-blue single-col-page"}>
                    <h2 style={{marginTop: "0"}}>SVForPete Admin</h2>
                    <div id={'admin-content'}>
                        <div id={'manage-actions'}>
                            <h4>Actions</h4>
                            <div id={'manage-widgets'}>
                                <span className={'error-button'}>
                                    <input type={'button'} value={'Download Membership Report'}
                                           onClick={this.downloadReport}/>
                                <this.ErrorMsg cond={this.state.errors.download}>
                                    Only managers can download the membership report.
                                </this.ErrorMsg>
                                </span>
                                <span className={'error-button'}>
                                <input type={'button'} value={'Submit Event List'} onClick={this.submit}/>
                                <this.ErrorMsg cond={this.state.errors.submit}>
                                    Only managers can see and edit the event list.
                                </this.ErrorMsg>
                                </span>
                            </div>
                        </div>
                        <div id={'manage-event-list'}>
                            <h4> Event List </h4>
                            <this.SortableList items={this.state.events} onSortEnd={this.onSortEnd} useDragHandle/>
                            <input type={'button'} value={'Add Event'} onClick={this.addEvent}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}



