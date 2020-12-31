import React from "react";
import axios from "axios";

import { server } from "../../config";
import { pageDataReader, pageDataUpdater } from "../../utils/pageDataManager";
import MediaListManager from "../mediaListManager";
import SeriesListManager from "../seriesListManager";

export default class Explorer extends React.Component {
  state = {
    uploadedFiles: [],
    seriesLibrary: [],
    data: [],
    init: false,
  };

  async componentDidMount() {
    let uploadedFiles = await this.getFiles();
    let seriesLibrary = await this.getSeries();
    let data = await this.getPage();
    console.log(data);
    this.setState({
      data: data,
      init: true,
      uploadedFiles: uploadedFiles,
      seriesLibrary: seriesLibrary,
    });
  }
  getPage = async () => {
    return axios
      .get(`${server}/page/title`, {
        params: {
          title: pageDataReader.PG_EXPLORER,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
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
    return axios
      .get(`${server}/series`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getSeriesListManagerForRecomendations = () => {
    let contents = pageDataReader(
      this.state.data,
      pageDataReader.PG_EXPLORER,
      pageDataReader.SN_RECCOS,
      pageDataReader.TP_SERIES
    );
    return (
      <SeriesListManager
        data={contents}
        seriesLibrary={this.state.seriesLibrary}
        update={this.updateRecommendations}
      />
    );
  };
  updateRecommendations = (contents) => {
    let data = this.state.data;
    data = pageDataUpdater(
      data,
      pageDataReader.PG_EXPLORER,
      pageDataReader.SN_RECCOS,
      contents
    );
    this.setState({
      data: data,
    });
  };
  getMediaListManagerForGuided = () => {
    let contents = pageDataReader(
      this.state.data,
      pageDataReader.PG_EXPLORER,
      pageDataReader.SN_GUIDEDMEDITATIONS,
      pageDataReader.TP_AUDIO
    );

    return (
      <MediaListManager
        data={contents}
        uploadedFiles={this.state.uploadedFiles}
        update={this.updateGuided}
      />
    );
  };
  updateGuided = (contents) => {
    let data = this.state.data;
    data = pageDataUpdater(
      data,
      pageDataReader.PG_EXPLORER,
      pageDataReader.SN_GUIDEDMEDITATIONS,
      contents
    );
    this.setState({
      data: data,
    });
  };
  getMediaListManagerForFocus = () => {
    let contents = pageDataReader(
      this.state.data,
      pageDataReader.PG_EXPLORER,
      pageDataReader.SN_FOCUSMUSIC,
      pageDataReader.TP_AUDIO
    );
    return (
      <MediaListManager
        data={contents}
        uploadedFiles={this.state.uploadedFiles}
        update={this.updateFocus}
      />
    );
  };
  updateFocus = (contents) => {
    let data = this.state.data;
    data = pageDataUpdater(
      data,
      pageDataReader.PG_EXPLORER,
      pageDataReader.SN_FOCUSMUSIC,
      contents
    );
    this.setState({
      data: data,
    });
  };

  getMediaListManagerForIntro = () => {
    let contents = pageDataReader(
      this.state.data,
      pageDataReader.PG_EXPLORER,
      pageDataReader.SN_INTRO,
      pageDataReader.TP_AUDIO
    );
    return (
      <MediaListManager
        data={contents}
        uploadedFiles={this.state.uploadedFiles}
        update={this.updateIntro}
      />
    );
  };
  updateIntro = (contents) => {
    let data = this.state.data;
    data = pageDataUpdater(
      data,
      pageDataReader.PG_EXPLORER,
      pageDataReader.SN_INTRO,
      contents
    );
    this.setState({
      data: data,
    });
  };

  save = async () => {
    console.log(this.state.data);
    let response = await axios.post(`${server}/page`, this.state.data);
  };
  render() {
    if (!this.state.init) return null;

    return (
      <main className="py-2">
        <div className="container pt-1">
          <div className="row">
            <div className="col">
              <h4 className=" d-flex">Explorer</h4>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex">Intro</div>
          </div>
          <div className="row">
            <div className="col">{this.getMediaListManagerForIntro()}</div>
          </div>
          <div className="row">
            <div className="col d-flex">Our Recommendations</div>
          </div>
          <div className="row">
            <div className="col">
              {this.getSeriesListManagerForRecomendations()}
            </div>
          </div>
          <div className="row">
            <div className="col d-flex">Guided Meditations</div>
          </div>
          <div className="row">
            <div className="col">{this.getMediaListManagerForGuided()}</div>
          </div>
          <div className="row">
            <div className="col d-flex">Focus Music</div>
          </div>
          <div className="row">
            <div className="col">{this.getMediaListManagerForFocus()}</div>
          </div>
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.save}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
