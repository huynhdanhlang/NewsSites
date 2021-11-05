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
import { Pagination } from "@material-ui/lab";

export default function BoardAdmin() {
  const user = useSelector(userAllState$);
  const [alluser, setAllUser] = useState(user);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentuser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  React.useEffect(() => {
    dispatch(retrieveUser());
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

  const getRequestParams = (searchName, page, pageSize) => {
    let params = {};

    if (searchName) {
      params["name"] = searchName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const findRetrieveAllUser = () => {
    const params = getRequestParams(searchName, page, pageSize);

    UserService.findByName(params)
      .then((response) => {
        const { user, totalPages } = response.data;

        setAllUser(user);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(findRetrieveAllUser, [page, pageSize]);

  // const findByName = () => {
  //   refreshData();
  //   // dispatch(findByNameUser(searchName));
  // };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
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
                    onClick={findRetrieveAllUser}
                    className="btn btn-outline-secondary"
                    href="#"
                    role="button"
                  >
                    Tìm kiếm{" "}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-3">
              {"Items per Page: "}
              <select onChange={handlePageSizeChange} value={pageSize}>
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <Pagination
                className="my-3"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                color="primary"
                onChange={handlePageChange}
              />
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
                    <br />
                    <a
                      onClick={onClickUpdateUser}
                      className="float-end btn btn-primary btn-sm "
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
