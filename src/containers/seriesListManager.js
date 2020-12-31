import React, { Component } from "react";

export default class SeriesListManager extends Component {
  state = {
    data: this.props.data,
    seriesLibrary: this.props.seriesLibrary,
    title: "",
    selectedSeriesIndexOfLibrary: -1,
  };
  componentDidMount() {
    console.log(this.props.seriesLibrary);
    this.setState({
      data: this.props.data,
      seriesLibrary: this.props.seriesLibrary,
    });
  }

  handleDelete = (index) => {
    const list = this.state.data;

    list.splice(index, 1);
    this.props.update(list);
    this.setState({ data: list });
  };

  handleDDChange = (event) => {
    this.setState({
      selectedSeriesIndexOfLibrary: event.target.value,
    });
  };
  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleAdd = () => {
    let list = [
      ...this.state.data,
      {
        title: this.state.title,
        type: "series",
        series: this.state.seriesLibrary[
          this.state.selectedSeriesIndexOfLibrary
        ].name,
      },
    ];
    this.props.update(list);

    this.setState({
      data: list,
      title: "",
      selectedSeriesIndexOfLibrary: -1,
    });
  };

  renderDataRows = () => {
    let list = this.state.data;
    return list.map((elem, index) => {
      return (
        <tr key={index}>
          <td>{elem.title}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(index)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  update = () => {
    this.props.update(this.state.data);
  };

  render() {
    return (
      <div className="container my-3 mx-3 ">
        <div className="row clearfix">
          <div className="col-sm-12 column">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>{this.renderDataRows()}</tbody>
            </table>
          </div>
        </div>
        <form className="border py-3 px-2">
          <div className="row g-3 ">
            <div className="col-sm my-3 mx-2">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleChangeTitle}
              />
            </div>
            <div className="col-sm my-3 mx-2">
              <select
                className="form-select"
                value={this.state.selectedSeriesIndexOfLibrary}
                onChange={this.handleDDChange}
              >
                <option>Select Series</option>
                {this.props.seriesLibrary.map((series, index) => (
                  <option key={index} value={index}>
                    {series.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-sm my-3 mx-2">
              <button className="btn btn-success" onClick={this.handleAdd}>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
