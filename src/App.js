import React from "react";
import "./stylesheets/App.css";
import NavBar from "./widgets/NavBar";
import Footer from "./widgets/Footer";
import "./stylesheets/ActionNetworkStyles.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SkeletonPage from "./pages/SkeletonPage";
import NotFound from "./pages/NotFound";
import pages from "./constants/Pages";

const getPrevPages = (pageName) => {
  let prevPages = 0;
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].href === pageName) {
      return prevPages;
    }
    prevPages += pages[i].sections.reduce((total, current) => isNaN(total) ? (total.ref ? 1 : 0) : (current.ref ? total + 1 : total));
  }
  return -1;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navColors: (new Array(this.pageLinkData.length)).fill(false),
      prevColor: null,
      page: "",
      section: null
    };
  }

  // Converts array of pages into an array of objects (sections) with refs (with fields title, href, and section)
  pageLinkData = pages.map(({ href, sections }) => (
    sections
      .filter(({ ref }) => ref)
      .map(({ title, id }) => {
        return {
          title: title,
          href: href,
          section: id
        }
      })
  )).flat();

  setPage = (page) => this.setState({ page });

  setSection = (section) => this.setState({ section });

  setActiveColor = (page, index) => {
    let pageIndex = getPrevPages(page);
    if (index + pageIndex === this.state.prevColor || pageIndex === -1) return;
    let navColors = this.state.navColors;
    navColors[index + pageIndex] = true;
    navColors[this.state.prevColor] = false;
    this.setState({ navColors: navColors, prevColor: index + pageIndex });
  };

  Routes = ({ refs }) => (
    <Switch>
    {pages.map((page, i) => {
      if (!refs[page.href]) return null;
      let Sections = () => page.sections.map(({ id, Component }, j) => (
        <div key={i + " " + j} id={id} ref={refs[page.href][j]}><Component /></div>
      ));
      return (
        <Route exact key={i} path={page.href} render={(props) => (
          <SkeletonPage
            page={page.href}
            setPage={this.setPage}
            section={this.state.section}
            refs={refs}
            setActiveColor={this.setActiveColor}
            prevColor={this.state.prevColor}
            {...props}
          >
            <Sections />
          </SkeletonPage>
        )} />
      )
    }).concat(<Route component={NotFound} />)}
    </Switch>
  );

  componentDidMount() {
    this.refs = {};
    // Creates array of arrays of sections with either a ref or null
    for (let page of pages) {
      this.refs[page.href] = page.sections.map((section) => section.ref ? React.createRef() : null);
      this.forceUpdate();
    }
  }

  render() {
    return (
      <Router>
        <div className={"App"}>
          <NavBar {...this.state} pageLinkData={this.pageLinkData} getPrevPages={getPrevPages} setSection={this.setSection} />
          <this.Routes refs={this.refs} />
          <Footer />
        </div>
      </Router>
    );
  }
}
