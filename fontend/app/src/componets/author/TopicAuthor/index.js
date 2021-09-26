import React from "react";
import { Router, Switch, Route, Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Navbar, DropdownButton, ButtonGroup } from "react-bootstrap";
import { history } from "../../../helpers/history";

import ChildTopic from "./ChildTopic/index";
import ParentTopic from "./ParentTopic/index";

function TopicAuthor() {


  return (
    <Router history={history}>
      <Navbar variant="dark" fixed="bottom" bg="dark" expand="lg">
        <Navbar.Brand href="#">Chủ đề</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <DropdownButton
            as={ButtonGroup}
            id={`dropdown-button-drop-up`}
            drop="up"
            variant="secondary"
            menuVariant="dark"
            title={` Chủ đề `}
          >
            <Link to="/author/topic/addChild" className="nav-link">
              Thêm chủ đề
            </Link>
            <Link to="/author/topic/childTopic" className="nav-link">
              Danh sách chủ đề
            </Link>
          </DropdownButton>
          &nbsp;
          <DropdownButton
            as={ButtonGroup}
            key="up"
            id={`dropdown-button-drop-up-click`}
            drop="up"
            variant="secondary"
            menuVariant="dark"
            title={` Chủ đề và thẻ `}
          >
            <Link
              to="/author/topic/addParent"
              className="nav-link"
              id="check-lick"
            >
              Thêm chủ đề và thẻ
            </Link>{" "}
            <Link to="/author/topic/topicParent" className="nav-link">
              Danh sách chủ đề và thẻ
            </Link>
          </DropdownButton>
        </Navbar.Collapse>
      </Navbar>

      <div className="container">
        <Switch>
          <Route
            exact
            path="/author/topic/childTopic"
            component={ChildTopic.ListChildTopic}
          />
          <Route
            exact
            path="/author/topic/addChild"
            component={ChildTopic.AddChildTopic}
          />
          <Route
            exact
            path="/author/topic/childTopic/:id"
            component={ChildTopic.EditChildTopic}
          />
          <Route
            exact
            path="/author/topic/topicParent"
            component={ParentTopic.ListParentTopic}
          />
          <Route
            exact
            path="/author/topic/addParent"
            component={ParentTopic.AddParentTopic}
          />

          <Route
            path="/author/topic/topicParent/:id"
            component={ParentTopic.EditParentTopic}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default TopicAuthor;
