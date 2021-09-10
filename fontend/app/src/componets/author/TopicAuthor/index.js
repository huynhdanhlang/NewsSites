import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { history } from "../../../helpers/history";
import { clearMessage } from "../../../redux/actions/thunk/message";
import { useDispatch } from "react-redux";

import ChildTopic from "./ChildTopic/index";

// import AddParentTopic from "./AddTopic";
// import ListParentTopics from "./ListTopics";
// import EditParentTopic from "./EditTopic";

export default function TopicAuthor() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); //clear message when changing location
    });
  }, [dispatch]);

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
                    Tùy chọn
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark" style={{ backgroundColor: "#73a47" }}>
                    <Link to="./topic/listChildTopic" className="nav-link">
                      Danh sách chủ đề
                    </Link>

                    <Link to="./listTotalTopic" className="nav-link">
                      Nhập chủ đề
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              &nbsp;
              <li className="nav-item">
                <Link to="./listTotalTopic" className="nav-link">
                  Danh sách chủ đề
                </Link>
              </li>
              <li className="nav-item">
                <Link to="./listTotalTopic" className="nav-link">
                  Nhập chủ đề
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid !direction !spacing">
        <Switch>
          <Route path="./topic/listChildTopic" component={ChildTopic.ListChildTopic} />
          <Route path="/addChildTopic" component={ChildTopic.AddChildTopic} />
          <Route path="/editChildTopic" component={ChildTopic.EditChildTopic} />
        </Switch>
      </div>
    </Router>
  );
}
