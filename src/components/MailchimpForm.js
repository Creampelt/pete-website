import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const url = "https://siliconvalleyforpete.us20.list-manage.com/subscribe/post?u=d94e23948f69d9c3f4d31a958&amp;id=2e3af026c7";

const MailchimpForm = () => (
  <MailchimpSubscribe
    url={url}
    render={({ status, message, subscribe }) => <MyForm status={status} message={message} onValidated={subscribe} />}
  />
);

class MyForm extends React.Component {
  componentDidUpdate(prevProps) {
    const { status, message } = this.props;
    const prevStatus = prevProps.status;
    if (status === "error" && prevStatus !== "error") {
      alert(message);
    } else if (message) {
      console.log("[Mailchimp Form Submission] status =", status, "message =", message);
    } else {
      console.log("[Mailchimp Form Submission] status =", status);
    }
  }

  render() {
    let email, firstName, lastName, zipCode;
    const submit = () => {
      email &&
      firstName &&
      lastName &&
      zipCode &&
      email.value.indexOf("@") > -1 &&
      this.props.onValidated({
        EMAIL: email.value,
        FNAME: firstName.value,
        LNAME: lastName.value,
        MMERGE3: zipCode.value
      });
    };
    return (
      <div id={"get-involved-form-wrapper"} className={"heartland-yellow"}>
        <div id={"get-involved-form"} className={"heartland-yellow"}>
          <h4>Get involved today</h4>
          <form id={"contact-form"}>
            <div className={"large-col"}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input type={"text"} ref={node => (firstName = node)} placeholder={"First name*"} required />
                <input type={"text"} ref={node => (lastName = node)} placeholder={"Last name*"} required />
              </div>
              <input type={"email"} ref={node => (email = node)} placeholder={"Email*"} required />
            </div>
            <div className={"small-col"}>
              <input type={"text"} ref={node => (zipCode = node)} placeholder={"Zip code*"} required />
              <button type={"button"} className={"submit"} onClick={submit}>Submit</button>
            </div>
          </form>
          {this.props.status === "success" && <p className={"form-status-message"}>{this.props.message}</p>}
          {this.props.status === "sending" && <p className={"form-status-message"}>sending...</p>}
        </div>
      </div>
    );
  }
}

export default MailchimpForm;
