import React, { Component } from "react";

export default class MediaListManager extends Component {
  state = {
    data: this.props.data,
    order: "",
    title: "",
    content: "",
  };
  componentDidMount() {
    this.setState({
      data: this.props.data,
    });
  }

  handleDelete = (index) => {
    const list = this.state.data;

    list.splice(index, 1);
    this.props.update(list);
    this.setState({ data: list });
  };

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleChangeOrder = (event) => {
    this.setState({
      order: event.target.value,
    });
  };

  handleDDChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  handleAdd = () => {
    let list = [
      ...this.state.data,
      {
        type: "audio",
        order: this.state.order,
        title: this.state.title,
        content: this.state.content,
      },
    ];
    this.props.update(list);

    this.setState({
      data: list,
      title: "",
      content: "",
      order: "",
    });
  };

  renderDataRows = () => {
    let list = this.state.data.sort((a, b) => a.order - b.order);
    return list.map((elem, index) => {
      return (
        <tr key={index}>
          <td>{elem.order}</td>
          <td>{elem.title}</td>
          <td>{elem.content}</td>
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
                  <th scope="col">Order</th>
                  <th scope="col">Title</th>
                  <th scope="col">Content</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>{this.renderDataRows()}</tbody>
            </table>
          </div>
        </div>
        <form className="border py-3 px-2">
          <div className="row g-3 ">
            <div className="col-sm-2 my-3 mx-2">
              <input
                type="text"
                className="form-control "
                style={{ width: "5rem" }}
                placeholder="Order"
                value={this.state.order}
                onChange={this.handleChangeOrder}
              />
            </div>
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
                value={this.state.content}
                onChange={this.handleDDChange}
              >
                <option>Select Content</option>
                {this.props.uploadedFiles.map((file, index) => (
                  <option key={index} value={file}>
                    {file}
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
