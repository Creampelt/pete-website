import React from "react";
import aboutUs from "../../assets/images/group-picture.jpg";
import MailchimpForm from "../../components/MailchimpForm";
import AnimatedRow from "../../components/AnimatedRow";

const SignUp = () => (
  <div id={"about-us"} className={"section"}>
    <AnimatedRow
      bottom={window.innerWidth > 814 ? "left" : "right"}
      offset={-100}
      leftContent={<img src={aboutUs} alt={""} className={"about-us-photo"} />}
      rightContent={
        <div className={"blue-sky about-us-content"}>
          <div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "#EEF4F8" }}>sign<span style={{ color: "#D34E23" }}>up</span></h3>
            </div>
            <p id={"signup-message"}>
              Sign up here to receive our newsletter and occasional emails about local upcoming events such as
              volunteer opportunities, local Pete appearances, and joining our fun MeetUp events like debate
              night watch parties.
            </p>
            <MailchimpForm />
          </div>
        </div>
      }
    />
  </div>
);

export default SignUp;
