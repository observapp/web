import React from "react";
import Navbar from "../components/navbar";
import Settings from "./pages/settings";
import Explorer from "./pages/explorer";
import Media from "./pages/media";
import Series from "./pages/series";
import Meditate from "./pages/meditate";
import Music from "./pages/music";
import Live from "./pages/live";
import Publish from "./pages/publish";

import {
  SETTINGS,
  MEDIA,
  SERIES,
  EXPLORER,
  MEDITATE,
  MUSIC,
  LIVE,
  PUBLISH,
} from "./pages/pageConstants";

export default class Main extends React.Component {
  state = {
    page: SETTINGS,
  };

  setPage = (page) => {
    this.setState({
      page: page,
    });
  };

  renderPage = () => {
    switch (this.state.page) {
      case SETTINGS:
        return <Settings setPage={this.setPage} />;

      case LIVE:
        return <Live setPage={this.setPage} />;

      case MEDIA:
        return <Media setPage={this.setPage} />;

      case SERIES:
        return <Series setPage={this.setPage} />;

      case EXPLORER:
        return <Explorer setPage={this.setPage} />;

      case MEDITATE:
        return <Meditate setPage={this.setPage} />;

      case MUSIC:
        return <Music setPage={this.setPage} />;
      case PUBLISH:
        return <Publish setPage={this.setPage} />;

      default:
        return <Settings setPage={this.setPage} />;
    }
  };

  render() {
    return (
      <div>
        <Navbar setPage={this.setPage} />
        {this.renderPage()}
      </div>
    );
  }
}
