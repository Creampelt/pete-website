import React from "react";
import AnimatedRow from "../../components/AnimatedRow";

export default class MeetPete extends React.Component {
  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
    this.state = {
      contentHeight: 0
    }
  }

  componentDidMount() {
    this.setState({ contentHeight: this.contentRef.current.offsetHeight });
  }

  render() {
    return (
      <div id={"meet-pete"} className={"section"}>
        <AnimatedRow
          bottom={"right"}
          offset={50}
          leftContent={
            <div className={"heartland-yellow meet-pete-content"} ref={this.contentRef}>
              <h2 style={{ textAlign: "center" }}>Meet Pete</h2>
              <div className={"row"}>
                <div className={"column"}>
                  <p style={{ textAlign: "left" }}>
                    Want to learn more about Pete and the campaign? Start with the&nbsp;
                    <a target={"_blank"} href={"https://peteforamerica.com"}>Pete for America website</a> and see how he's
                    structuring a values-based campaign. Pete is fabulous in an interview setting so check out&nbsp;
                    <a target={"_blank"} href={"https://meetpete.org"}>meetpete.org</a> where you can search video clips of
                    Pete talking specifics on hundreds of different topics. And of course check out social media.
                  </p>
                </div>
              </div>
            </div>
          }
          rightContent={
            <div className={"background river-blue"} style={{ width: "60vw", height: this.state.contentHeight }} />
          }
        />
      </div>
    )
  }
}