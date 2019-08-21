import React from "react";
import ArrowButton from "../../components/ArrowButton";
import AnimatedRow from "../../components/AnimatedRow";

export default class RegisterToVote extends React.Component {
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
      <div id={"register-to-vote"} className={"section"}>
        <AnimatedRow
          bottom={"right"}
          offset={50}
          leftContent={
            <div style={{ marginLeft: 30 }} ref={this.contentRef}>
              <ArrowButton href={"https://registertovote.ca.gov"}>Register to Vote</ArrowButton>
              <div className={"heartland-yellow"} style={{ width: "50vw", padding: "60px" }}>
                <h3>To vote in the 2020 California primary, you must register by February 17, 2020</h3>
              </div>
            </div>
          }
          rightContent={
            <div className={"background rust-belt"} style={{ height: this.state.contentHeight }} />
          }
        />
      </div>
    )
  }
}