import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./componets/Login";
import Register from "./componets/Register";
import Home from "./componets/Home";
import Profile from "./componets/Profile";
import BoardUser from "./componets/BoardUser";
import BoardAuthor from "./componets/BoardAuthor";
import BoardModerator from "./componets/BoardModerator";
import BoardAdmin from "./componets/BoardAdmin";

import { logout } from "./redux/actions/auth";
import { clearMessage } from "./redux/actions/message";

import { history } from "./helpers/history";

// import { getPosts } from "./redux/actions/posts";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAuthorBoard, setShowAuthorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // dispatch(getPosts.getPostsRequest()); //Test trigger action getPosts

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); //clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowModeratorBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowAuthorBoard(currentUser.roles.includes("ROLE_AUTHOR"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Hello
          </Link>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav">
              <li className="nav-item active">
                <Link to={"/home"} className="nav-link">
                  Trang chủ
                </Link>
              </li>
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin
                  </Link>
                </li>
              )}
              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Người kiểm duyệt
                  </Link>
                </li>
              )}
              {showAuthorBoard && (
                <li className="nav-item">
                  <Link to={"/author"} className="nav-link">
                    Tác giả
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    Người dùng
                  </Link>
                </li>
              )}
            </div>
          </div>

          {currentUser ? (
            <div className="navbar-nav">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/logout" className="nav-link" onClick={logOut}>
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
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Đăng ký
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container-fluid !direction !spacing">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/author" component={BoardAuthor} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
