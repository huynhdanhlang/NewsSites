import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { history } from "../../../helpers/history";
// import { clearMessage } from "../../../redux/actions/thunk/message";
import { useDispatch } from "react-redux";

import ChildTopic from "./ChildTopic/index";
import ParentTopic from "./ParentTopic/index";

export default function TopicAuthor() {
  const dispatch = useDispatch();

  return (
    <Router history={history}>
      <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Chủ đề
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item dropup">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary btn-sm"
                    id="dropdown-basic"
                  >
                    Chủ đề con
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    variant="dark"
                    style={{ backgroundColor: "#73a47" }}
                  >
                    <Link to="/author/topic/addChildTopic" className="nav-link">
                      Thêm chủ đề
                    </Link>
                    <Link
                      to="/author/topic/listChildTopic/:id"
                      className="nav-link"
                    >
                      Danh sách chủ đề
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              &nbsp;
              <li className="nav-item dropup">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary btn-sm"
                    id="dropdown-basic"
                  >
                    Chủ đề cha
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    variant="dark"
                    style={{ backgroundColor: "#73a47" }}
                  >
                    <Link
                      to="/author/topic/addParentTopic"
                      className="nav-link"
                    >
                      Thêm chủ đề
                    </Link>

                    <Link
                      to="/author/topic/listParentTopic/:id"
                      className="nav-link"
                    >
                      Danh sách chủ đề
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              &nbsp;
              <li className="nav-item">
                <Link to="/author/topic/listTotalTopic" className="nav-link">
                  Danh sách chủ đề
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/author/topic/levelTopic" className="nav-link">
                  Nhập chủ đề
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid !direction !spacing">
        <Switch>
          <Route
            path="/author/topic/listChildTopic"
            component={ChildTopic.ListChildTopic}
          />
          <Route
            path="/author/topic/addChildTopic"
            component={ChildTopic.AddChildTopic}
          />
          <Route
            path="/author/topic/listChildTopic/:id"
            component={ChildTopic.EditChildTopic}
          />
          <Route
            path="/author/topic/listParentTopic"
            component={ParentTopic.ListParentTopic}
          />
          <Route
            path="/author/topic/addParentTopic"
            component={ParentTopic.AddParentTopic}
          />

          <Route
            path="/author/topic/listParentTopic/:id"
            component={ParentTopic.EditParentTopic}
          />
          {/* <Route path="/author/topic/listTotalTopic" component={{}} />
          <Route path="/author/topic/levelTopic" component={{}} /> */}
        </Switch>
      </div>
    </Router>
  );
}
