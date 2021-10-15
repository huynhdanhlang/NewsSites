import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./componets/login/Login";
import Register from "./componets/register/Register";
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

// import { getPosts } from "./redux/actions/posts";

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

  useEffect(async () => {
    await getParentTopic();
    history.listen((location) => {
      dispatch(clearMessage()); //clear message when changing location
    });
  }, [dispatch]);

  // const [topicarr, setTopicArr] = useState([]);

  // data.map((topic) => {
  //   setTopicArr([{ ...topicarr, [topic["name_topic"]]: false }]);
  // });
  // const [click, setClick] = useState(false);

  // const [dropdown, setDropdown] = useState(topicarr);

  // const handleClick = () => setClick(!click);
  // const closeMobileMenu = () => setClick(false);

  // const onMouseEnter = (name) => {
  //   if (window.innerWidth < 960) {
  //     setDropdown((state) => ({ ...state, [name]: false }));
  //   } else {
  //     setDropdown((state) => ({ ...state, [name]: true }));
  //   }
  // };

  // const onMouseLeave = (name) => {
  //   setDropdown((state) => ({ ...state, [name]: false }));
  // };
  // dispatch(getPosts.getPostsRequest()); //Test trigger action getPosts

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

  return (
    <Router history={history}>
      <div>
        <Navbar variant="dark" bg="dark" expand="lg">
          {/* <Link to={"/"} className="navbar-brand">
            Hello
          </Link> */}
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
                      // <li
                      //   className="nav-item"
                      //   onMouseEnter={onMouseEnter.bind(this, topicArr[index])}
                      //   onMouseLeave={onMouseLeave.bind(this, topicArr[index])}
                      // >
                      //   <Link
                      //     to="/payments"
                      //     className="nav-links"
                      //     onClick={closeMobileMenu}
                      //   >
                      //     {item.name_topic} <i className="fas fa-caret-down" />
                      //   </Link>
                      //   {dropdown[index] && <PaymentsDropdown />}
                      // </li>
                      <DropdownButton
                        as={ButtonGroup}
                        id={`dropdown-button-drop-down`}
                        drop="down"
                        variant="secondary"
                        menuVariant="dark"
                        title={`${item.name_topic}`}
                      >
                        {item["name_topic_child"].map((child, index) => {
                          return (
                            <Link to="#" className="nav-link">
                              {child.name_topic}
                            </Link>
                            // <Link to="#" className="nav-link">
                            //   Test {index + 1}
                            // </Link>
                          );
                        })}
                      </DropdownButton>
                    );
                  })}
                </div>
              )}
              {/* {currentUser && (
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Trang chủ
                  </Link>
                </li>
              )} */}
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
            <Route exact path={["/home", "/"]} component={Home} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/register" component={Register} /> */}
            <Route exact path="/profile" component={Profile} />
            {/* <Route path="/user" component={BoardUser} /> */}
            <Route path="/author" component={SimpleBottomNavigation} />
            <Route path="/mod" component={ModeraterBottomNavigation} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
