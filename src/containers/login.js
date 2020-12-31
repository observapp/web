import React from "react";
import axios from "axios";
import { server } from "../config";

class Login extends React.Component {
  state = {
    email: "",
    pwd: "",
    token: null,
  };
  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handlePwdChange = (event) => {
    this.setState({
      pwd: event.target.value,
    });
  };
  handleSubmit = () => {
    console.log(server);

    axios
      .post(`${server}/admin`, {
        email: this.state.email,
        password: this.state.pwd,
      })
      .then(
        (response) => {
          console.log(response);
          if (response.data && response.data.auth) {
            this.props.auth(response.data.token);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm">
            <div className="container vertical-center ">
              <div className="row">
                <div className="col">
                  <form>
                    <div className="mb-3">
                      <div className="form-text form-control-lg m-2">
                        Admin Login
                      </div>
                      <label
                        htmlFor="observInputEmail1"
                        className="form-label "
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control "
                        id="observInputEmail1"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                      />
                      <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="observInputPassword1"
                        className="form-label "
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="observInputPassword1"
                        value={this.state.pwd}
                        onChange={this.handlePwdChange}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    );
  }
}

export default Login;
