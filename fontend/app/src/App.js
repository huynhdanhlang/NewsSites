import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./componets/login/Login";
import Home from "./componets/home/Home";
import Profile from "./componets/profile/Profile";
// import BoardUser from "./componets/user/BoardUser";
import ModeraterBottomNavigation from "./componets/mod/BoardModerator";
import BoardAdmin from "./componets/admin/BoardAdmin";
import SimpleBottomNavigation from "./componets/author/index";
import { logout } from "./redux/actions/thunk/auth";
import { clearMessage } from "./redux/actions/thunk/message";
import { showAuthorTutorial } from "./redux/actions/saga/posts";
import ParentTopicDataService from "./services/parentTopic.service";
import { Navbar, DropdownButton, ButtonGroup } from "react-bootstrap";
// import NavTopic from "./componets/NavBar/index";
import { history } from "./helpers/history";
import ViewPost from "./componets/home/View/index";
import * as actions from "./redux/actions/saga/posts";
import Footer from "./componets/Footer/index";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAuthorBoard, setShowAuthorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [data, setData] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getParentTopic = async () => {
    await ParentTopicDataService.getAll()
      .then((response) => {
        console.log(["id"], response.data);
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  var path = ["/home", "/", "/"];

  const getPostTopic = (id, name_topic) => {
    path.pop();
    path.push(`/${name_topic}`);
    console.log(["path"], path);
    dispatch(actions.getPostsId.getPostsIdRequest(id));
  };

  // window.onpopstate = function (event) {
  //   window.location.reload();
  // };

  useEffect(async () => {
    await getParentTopic();
    history.listen((location) => {
      dispatch(clearMessage()); //clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAuthorBoard(currentUser.roles.includes("ROLE_AUTHOR"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  const onClick = React.useCallback(() => {
    dispatch(showAuthorTutorial());
  }, [dispatch]);

  // const postIndex = JSON.parse(localStorage.getItem("postIndex"));

  return (
    <Router history={history}>
      <div>
        <Navbar variant="dark" bg="dark" expand="lg">
          {!currentUser && (
            <Navbar.Brand href="/home">Báo sinh viên</Navbar.Brand>
          )}

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">
            <div className="navbar-nav">
              {!currentUser && (
                <div>
                  {data.map((item, index) => {
                    return (
                      <DropdownButton
                        as={ButtonGroup}
                        id={`${item._id}`}
                        drop="down"
                        onMouseEnter={(e) =>
                          document.getElementById(`${item._id}`).click()
                        }
                        onMouseLeave={(e) =>
                          document.getElementById(`${item._id}`).click()
                        }
                        variant="secondary"
                        menuVariant="dark" // onMouseEnter={true}
                        title={`${item.name_topic}`}
                      >
                        <Link
                          onClick={(e) =>
                            getPostTopic(item._id, item.name_topic)
                          }
                          to={`/${item.name_topic}`}
                          className="nav-link"
                        >
                          {item.name_topic}
                        </Link>{" "}
                        {item["name_topic_child"].map((child, index) => {
                          return (
                            <Link
                              onClick={(e) =>
                                getPostTopic(
                                  child._id,
                                  item.name_topic + "/" + child.name_topic
                                )
                              }
                              to={`/${item.name_topic}/${child.name_topic}`}
                              className="nav-link"
                            >
                              {child.name_topic}
                            </Link>
                          );
                        })}
                      </DropdownButton>
                    );
                  })}
                </div>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Trang chủ
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin
                  </Link>
                </li>
              )}
              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod/topic"} className="nav-link">
                    Người kiểm duyệt
                  </Link>
                </li>
              )}
              {showAuthorBoard && (
                <li className="nav-item">
                  <Link
                    onClick={onClick}
                    to={"/author/topic"}
                    className="nav-link"
                  >
                    Tác giả
                  </Link>
                </li>
              )}
            </div>
          </Navbar.Collapse>

          {currentUser ? (
            <div className="navbar-nav">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={logOut}>
                  Đăng xuất
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Đăng nhập
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Đăng ký
                </Link>
              </li> */}
            </div>
          )}
        </Navbar>

        <div className="container-fluid !direction !spacing">
          <Switch>
            <Route exact path={path} component={Home} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/register" component={Register} /> */}
            <Route exact path={`/news/:id`} component={ViewPost} />

            <Route exact path="/profile" component={Profile} />
            {/* <Route path="/user" component={BoardUser} /> */}
            <Route path="/author" component={SimpleBottomNavigation} />
            <Route path="/mod" component={ModeraterBottomNavigation} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
