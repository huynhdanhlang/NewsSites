import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Navbar, DropdownButton, ButtonGroup } from "react-bootstrap";
import { history } from "../../../helpers/history";
import TopicTutorial from "../../author/BoardAuthor/TopicToturial/index";
import ChildTopic from "./ChildTopic/index";
import ParentTopic from "./ParentTopic/index";
import { Container } from "@material-ui/core";
import { hideAuthorTutorial } from "../../../redux/actions/saga/posts";
import { useDispatch, useSelector } from "react-redux";
import { authorTutorial$ } from "../../../redux/selector/index";

function TopicAuthor() {
  const dispatch = useDispatch();

  // const onClick = React.useCallback(() => {
  //   dispatch(hideAuthorTutorial());
  // }, [dispatch]);

  const { isShowTutorial } = useSelector(authorTutorial$);

  return (
    <Container maxWidth={false} className="container">
      <Router history={history}>
        <Navbar variant="dark" bg="dark" expand="lg">
          &nbsp;
          <Navbar.Brand href="#">Chủ đề</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <DropdownButton
              as={ButtonGroup}
              id={`dropdown-button-drop-down`}
              drop="down"
              variant="secondary"
              menuVariant="dark"
              title={` Chủ đề `}
            >
              <Link
                // onClick={onClick}
                to="/author/topic/addChild"
                className="nav-link"
              >
                Thêm chủ đề
              </Link>
              <Link
                // onClick={onClick}
                to="/author/topic/childTopic"
                className="nav-link"
              >
                Danh sách chủ đề
              </Link>
            </DropdownButton>
            &nbsp;
            <DropdownButton
              as={ButtonGroup}
              key="down"
              id={`dropdown-button-drop-down-click`}
              drop="down"
              variant="secondary"
              menuVariant="dark"
              title={` Chủ đề và thẻ `}
            >
              <Link
                // onClick={onClick}
                to="/author/topic/addParent"
                className="nav-link"
                id="check-lick"
              >
                Thêm chủ đề và thẻ
              </Link>{" "}
              <Link
                // onClick={onClick}
                to="/author/topic/topicParent"
                className="nav-link"
              >
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

      {isShowTutorial ? <TopicTutorial /> : null}
    </Container>
  );
}

export default TopicAuthor;
