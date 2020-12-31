import React, { Component } from "react";

import MediaListManager from "./mediaListManager";

export default class SeriesEditor extends Component {
  state = {
    name: "",
    contents: [],
    init: false,
  };
  componentDidMount() {
    this.setState({
      name: this.props.series.name,
      contents: this.props.series.contents,
      init: true,
    });
  }
  updateName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  updateContents = (contents) => {
    this.setState({
      contents: contents,
    });
  };
  handleDone = () => {
    this.props.handleDone({
      name: this.state.name,
      contents: this.state.contents,
    });
    this.setState({
      name: "",
      contents: [],
    });
  };
  renderMediaListManager = () => {
    if (this.state.init) {
      return (
        <MediaListManager
          data={this.state.contents}
          uploadedFiles={this.props.uploadedFiles}
          update={this.updateContents}
        />
      );
    }
    return null;
  };
  render = () => {
    return (
      <div className="container border py-3 mt-3">
        <div className="row ">
          <div className="col-sm-10">
            <input
              type="text"
              placeholder="Series Name"
              className="form-control mx-4"
              value={this.state.name}
              onChange={this.updateName}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col">{this.renderMediaListManager()}</div>
        </div>
        <div className="row ">
          <div className="col">
            <button className="btn btn-success" onClick={this.handleDone}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };
}
