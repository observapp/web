import React from "react";
import axios from "axios";

import { server } from "../config";

export default class FileUpload extends React.Component {
  state = {
    file: null,
    progress: 0,
    data: { name: "", path: "" },
    uploadedFiles: [],
  };

  componentDidMount() {
    this.getFiles();
  }

  handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    this.setState({
      progress: 0,
      file: file,
    });
  };

  uploadFile = () => {
    if (this.state.file == null) return;
    const formData = new FormData();
    formData.append("file", this.state.file); // appending file
    axios
      .post(`${server}/media/upload`, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          this.setState({
            progress: progress,
          });
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  getFiles = () => {
    // axios.get(`${server}/media/all`);
    axios
      .get(`${server}/media/list`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          uploadedFiles: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  renderUpload = () => {
    return (
      <div class="card" style={{ width: "42rem" }}>
        <div class="card-body">
          <h6 class="card-title d-flex">Upload Media</h6>
          <p class="card-text  d-flex">
            <input
              type="file"
              class="form-control-file p-3"
              onChange={this.handleChange}
            />
          </p>
          <p class="card-text d-flex">Completed : {this.state.progress}</p>
          <button onClick={this.uploadFile} className="btn btn-primary  d-flex">
            Upload
          </button>
        </div>
      </div>
    );
  };

  renderMediaUploadSection = () => {
    return (
      <>
        <h4 className="mt-3">
          Media Uploaded{" "}
          <button onClick={this.getFiles} className="btn btn-warning">
            <i class="fa fa-refresh" aria-hidden="true">
              Refresh
            </i>
          </button>
        </h4>
        <div className="container p-1">
          <table className="table table-striped table-bordered">
            <tbody>
              {this.state.uploadedFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  render() {
    return (
      <main className="py-2">
        <div className="container pt-1">
          <div className="row">
            <div className="col">
              <h4 className="d-flex">Media</h4>
            </div>
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col d-flex">{this.renderUpload()}</div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
        </div>
        {this.renderMediaUploadSection()}
      </main>
    );
  }
}
