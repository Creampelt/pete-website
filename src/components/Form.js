import React from "react";
import "../stylesheets/App.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

let db = firebase.firestore();

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name:'', email:'', zip:''}

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name:event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email:event.target.value});
  }

  handleZipChange(event) {
    this.setState({zip:event.target.value});
  }

  handleSubmit(event) {
    db.collection('membership').add({
      name: this.state.name,
      email: this.state.email,
      zip: this.state.zip
    }).catch((err) => {
      alert('Error entering data ' +  err);
    }).then(() => {
      this.setState({name:'',email:'',zip:''});
    });

    // preventDefault stops the form from actually being submitted as a javascript form.
    // We shouldn't need that as all we care about is putting the data in firebase.
    event.preventDefault();
  }

  render() {
    return (
        <div id={"get-involved-form-wrapper"} className={"heartland-yellow"}>
          <div id={"get-involved-form"} className={"heartland-yellow"}>
            <h4>Get involved today</h4>
            <form id="contact-form" onSubmit={this.handleSubmit} >
              <div className={"large-col"}>
                <input type={"text"} value={this.state.name}
                       onChange={this.handleNameChange} placeholder={"Full name*"} required />
                <input type={"text"} value={this.state.email}
                       onChange={this.handleEmailChange} placeholder={"Email*"} required />
              </div>
              <div className={"small-col"}>
                <input type={"text"} value={this.state.zip}
                       onChange={this.handleZipChange} placeholder={"Zip code*"} required />
                <input type={"submit"} value="Submit" className={"submit"} />
              </div>
            </form>
          </div>
        </div>
    )
  }
}
