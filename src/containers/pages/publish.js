import React from "react";
import { server } from "../../config";
import axios from "axios";
import { pageDataReader } from "../../utils/pageDataManager";

export default class Publish extends React.Component {
  state = {
    content: [],
    seriesData: [],
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
  getPages = async () => {
    let pages = [];
    try {
      let response = await axios.get(`${server}/page/`);
      if (response.data) {
        pages = response.data;
      }
    } catch (error) {
      console.error(error);
    }
    return pages;
  };
  async componentDidMount() {
    let pages = await axios.get(`${server}/page`);
    let seriesData = await this.getSeries();
    pages = this.mergeSeries(pages.data, seriesData);
    this.setState({
      content: pages,
      seriesData: seriesData,
    });
  }

  mergeSeries = (pages, seriesData) => {
    pages.forEach((page) => {
      page.sections.forEach((section) => {
        section.contents.forEach((item) => {
          if (item.type === pageDataReader.TP_SERIES) {
            let seriesArray = seriesData.filter(
              (series) => series.name == item.series
            );
            if (seriesArray.length > 0) {
              item.contents = seriesArray[0].contents;
            }
          }
        });
      });
    });
    return pages;
  };
  publish = async () => {
    await axios.post(`${server}/repo`, this.state.content);
  };
  render() {
    return (
      <main className="py-2">
        <div className="container pt-1">
          <div className="row">
            <div className="col">
              <h4 className=" d-flex">Publish</h4>
            </div>
          </div>
          <div className="row">
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col">
              <iframe
                style={{
                  width: "100%",
                  height: "80%",
                  color: "red",
                  backgroundColor: "white",
                }}
                src={
                  "data:text/json," +
                  encodeURIComponent(JSON.stringify(this.state.content))
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col py-5">
              <a
                target="_blank"
                href="https://jsonformatter.curiousconcept.com/"
              >
                JSON Viewer
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                type="button"
                class="btn btn-primary"
                onClick={this.publish}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
