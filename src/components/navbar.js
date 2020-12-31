import React from "react";

import {
  SETTINGS,
  MEDIA,
  SERIES,
  EXPLORER,
  MEDITATE,
  MUSIC,
  LIVE,
  PUBLISH,
} from "../containers/pages/pageConstants";

const renderNavBar = (props) => {
  console.log(props);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Observ
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="#"
                onClick={() => props.setPage(SETTINGS)}
              >
                Settings
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => props.setPage(MEDIA)}
              >
                Media
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => props.setPage(SERIES)}
              >
                Series
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => props.setPage(EXPLORER)}
              >
                Explorer
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => props.setPage(MEDITATE)}
              >
                Meditate
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => props.setPage(MUSIC)}
              >
                Music
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => props.setPage(LIVE)}
              >
                Live
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => props.setPage(PUBLISH)}
              >
                Publish
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default renderNavBar;
