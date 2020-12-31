import "./App.css";
import React from "react";
import Main from "./containers/main";
import Login from "./containers/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  LOGIN = 0;
  MAIN = 1;
  state = {
    token: null,
    page: this.LOGIN,
  };

  auth = (token) => {
    this.setState({
      token: token,
      page: this.MAIN,
    });
  };
  renderPage = () => {
    switch (this.state.page) {
      case this.MAIN:
        return <Main />;
        break;

      default:
        return <Login auth={this.auth} />;
    }
  };
  verify = ({ match }) => {
    return <div>Havent decided how to verify as yet :{match.params.id}</div>;
  };
  render() {
    //    return <div className="App">{this.renderPage()}</div>;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={this.renderPage} />
            <Route exact path="/verify/:id" component={this.verify} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
