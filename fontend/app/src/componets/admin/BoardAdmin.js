import React from "react";
import { history } from "../../helpers/history";
import UserService from "../../services/user.service";
import { Router } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveAllRoles } from "../../redux/actions/thunk/roles";
import { findByNameUser, retrieveUser } from "../../redux/actions/thunk/user";
import { userAllState$ } from "../../redux/selector/index";
import AddUser from "./AddUser/index";

export default function BoardAdmin() {
  const alluser = useSelector(userAllState$);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentuser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");

  React.useEffect(() => {
    dispatch(retrieveUser());
    // UserService.getAllUser().then(
    //   (response) => {
    //     setAllUser(response.data);
    //   },
    //   (error) => {
    //     setErr(true);
    //     const _alluser =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     setResponse(_alluser);
    //   }
    // );
  }, []);

  console.log(["err"], err);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    dispatch(retrieveAllRoles());
  }, []);

  console.log(["shgdhs"], currentuser);

  const setActiveParentTopic = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
    setUsername(user.username);
    setFullname(user.fullname);
    setEmail(user.email);
    setPassword(user.password);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeFullname = (e) => {
    const fullname = e.target.value;
    setFullname(fullname);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  React.useEffect(() => {
    setCurrentUser({
      ...currentuser,
      fullname: fullname,
      username: username,
      email: email,
      password: password,
    });
  }, [fullname, username, email, password]);

  const onClickUpdateUser = () => {
    UserService.update(currentuser).then(() => {
      window.location.reload();
    });
  };

  const onChangeSearchName = (e) => {
    const SearchName = e.target.value;
    setSearchName(SearchName);
  };

  const refreshData = () => {
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const findByName = () => {
    refreshData();
    dispatch(findByNameUser(searchName));
  };

  var err = localStorage.getItem("error");
  var response = localStorage.getItem("isAllow");

  return (
    <Router history={history}>
      {err ? (
        <div>{response}</div>
      ) : (
        <div>
          <AddUser />
          <div className="list row">
            <div className="col-md-8">
              {" "}
              &nbsp;
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm theo tên"
                  value={searchName}
                  onChange={onChangeSearchName}
                />
                <div className="input-group-append">
                  <a
                    onClick={findByName}
                    className="btn btn-outline-secondary"
                    href="#"
                    role="button"
                  >
                    Tìm kiếm{" "}
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <h4>Danh sách người dùng</h4>
              <ul className="list-group">
                {alluser &&
                  alluser.map((user, index) => (
                    <li
                      key={index}
                      className={
                        "list-group-item" +
                        (index === currentIndex ? " active" : "")
                      }
                      onClick={() => setActiveParentTopic(user, index)}
                      key={index}
                    >
                      {user.fullname}
                      {user["roles"].map((role, index) => {
                        return (
                          <div
                            style={{
                              float: "right",
                              backgroundColor: "lightcoral",
                            }}
                            key={index}
                          >
                            {role.name}&nbsp;
                          </div>
                        );
                      })}
                    </li>
                  ))}
                &nbsp;
              </ul>
            </div>

            <div className="col-md-6">
              {alluser[currentIndex] ? (
                <div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="fullname">Họ và tên</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullname"
                        value={fullname}
                        onChange={onChangeFullname}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Tên người dùng</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Mật khẩu</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                      />
                    </div>

                    <a
                      onClick={onClickUpdateUser}
                      className="btn btn-primary btn-sm "
                      href="#"
                      role="button"
                    >
                      Cập nhật
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Xin nhấn vào một người dùng</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}
