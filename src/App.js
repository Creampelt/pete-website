import React from "react";
import "./stylesheets/App.css";
import NavBar from "./widgets/NavBar";
import Footer from "./widgets/Footer";
import "./stylesheets/action-network-styles.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Collateral from "./pages/Collateral";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navColors: ["#F2BA42", "#EEF4F8", "#EEF4F8"],
      page: "/",
      section: null
    };
  }

  setPage = (page) => this.setState({ page });

  render() {
    return (
      <Router>
        <div className={"App"}>
          <NavBar colors={this.state.navColors} page={this.state.page} setSection={(section) => this.setState({ section })} />
          <Route exact path={"/"} render={(props) => (
            <Home
              setColors={(navColors) => this.setState({ navColors })}
              setPage={this.setPage}
              section={this.state.section}
              {...props}
            />
          )} />
          <Route path={"/collateral"} render={(props) => (<Collateral setPage={this.setPage} {...props} />)} />
          <Footer />
        </div>
      </Router>
    );
  }
}
