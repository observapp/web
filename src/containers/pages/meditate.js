import React from "react";

export default class Meditate extends React.Component {
  render() {
    return (
      <main className="py-2">
        <div className="container pt-1">
          <div className="row">
            <div className="col">
              <h4 className="d-flex">Meditate</h4>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex">Intro</div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col d-flex">Our Recommendations</div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
        </div>
      </main>
    );
  }
}
