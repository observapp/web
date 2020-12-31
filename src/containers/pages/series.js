import React from "react";
import axios from "axios";

import { server } from "../../config";
import SeriesEditor from "../seriesEditor";

export default class Series extends React.Component {
  state = {
    data: [],
    uploadedFiles: [],
    selectedSeriesIndex: -1,
    renderAddNew: false,
  };
  getFiles = async () => {
    return axios
      .get(`${server}/media/list`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getSeries = async () => {
    let seriesData = [];
    try {
      let response = await axios.get(`${server}/series`);
      if (response.data) {
        seriesData = response.data;
      }
    } catch (error) {
      console.error(error);
    }
    return seriesData;
  };
  async componentDidMount() {
    let uploadedFiles = await this.getFiles();
    let seriesData = await this.getSeries();
    this.setState({
      data: seriesData,
      uploadedFiles: uploadedFiles,
    });
  }
  setSelectedSeries = (index) => {
    this.setState({
      selectedSeriesIndex: -1,
    });
    setTimeout(() => {
      this.setState({
        selectedSeriesIndex: index,
        renderAddNew: false,
      });
    }, 500);
  };
  renderSeriesData = () => {
    return (
      <table className="table table-striped table-bordered my-3">
        <tbody>
          {this.state.data.map((series, index) => (
            <tr key={index} onClick={() => this.setSelectedSeries(index)}>
              <td>{series.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  handleAddNew = (series) => {
    if (series.name) {
      let data = this.state.data;
      data.push(series);
      this.setState({
        data: data,
        renderAddNew: false,
      });
    } else {
      this.setState({
        renderAddNew: false,
      });
    }
  };
  handleEditingCompleted = (series) => {
    if (series.name) {
      let data = this.state.data;
      data[this.state.selectedSeriesIndex] = series;
      this.setState({
        data: data,
        selectedSeriesIndex: -1,
      });
    } else {
      this.setState({
        selectedSeriesIndex: -1,
      });
    }
  };

  renderEditor = () => {
    if (this.state.renderAddNew) {
      return (
        <SeriesEditor
          series={{ name: "", contents: [] }}
          uploadedFiles={this.state.uploadedFiles}
          handleDone={this.handleAddNew}
        />
      );
    }
    if (this.state.selectedSeriesIndex != -1) {
      return (
        <SeriesEditor
          series={this.state.data[this.state.selectedSeriesIndex]}
          uploadedFiles={this.state.uploadedFiles}
          handleDone={this.handleEditingCompleted}
        />
      );
    }
    return null;
  };

  handleSaveAll = async () => {
    console.log(this.state.data);
    try {
      let response = await axios.post(`${server}/series`, this.state.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <main className="py-2">
        <div className="container pt-1">
          <div className="row">
            <div className="col">
              <h4 className=" d-flex">Series</h4>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    this.state.selectedSeriesIndex > -1
                      ? null
                      : this.setState({ renderAddNew: true })
                  }
                >
                  Add New Series
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.handleSaveAll}
                >
                  Save All Series
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex"></div>
          </div>
          <div className="row">
            <div className="col d-flex">{this.renderEditor()}</div>
          </div>
          <div className="row">
            <div className="col"></div>
          </div>{" "}
          <div className="row mt-3">
            <div className="col d-flex">Series</div>
          </div>
          <div className="row">
            <div className="col">{this.renderSeriesData()}</div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
        </div>
      </main>
    );
  }
}
