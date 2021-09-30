import React from "react";

import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selector/index";
import { handleActions } from "redux-actions";
import { Link } from "react-router-dom";
const Profile = () => {
  const { user: currentUser } = useSelector(userState$);

  const [state, setState] = React.useState(true);
  const edit = Boolean(state);

  const initialState = {
    fullname: currentUser.fullname,
    email: currentUser.email,
    username: currentUser.username,
  };

  const [values, setValues] = React.useState(initialState);

  console.log("[currentUser]", currentUser);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const handleClick = (event) => {
    setState(false);
  };

  const handleOnChange = (event) => {
    setValues(event.target.value);
  };

  return (
    <div className="container bootstrap snippet">
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-sm-3">
          <div className="text-center">
            <img
              src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
              className="avatar img-circle img-thumbnail"
              alt="avatar"
            ></img>
            <h6>Đổi avatar</h6>
            <input
              type="file"
              className="text-center center-block file-upload"
            />
          </div>
        </div>
        <div className="col-sm-9">
          <div className="tab-content">
            <div className="tab-pane active" id="home">
              <form
                className="form"
                action="##"
                method="post"
                id="registrationForm"
              >
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="first_name">
                      <h4>Họ và tên</h4>
                    </label>
                    <input
                      onChange={handleOnChange}
                      readOnly={edit}
                      type="text"
                      className="form-control"
                      name="first_name"
                      id="first_name"
                      value={values.fullname}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="last_name">
                      <h4>Tên người dùng</h4>
                    </label>
                    <input
                      onChange={handleOnChange}
                      readOnly={edit}
                      type="text"
                      className="form-control"
                      name="last_name"
                      id="last_name"
                      value={values.username}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="email">
                      <h4>Email</h4>
                    </label>
                    <input
                      onChange={handleOnChange}
                      readOnly={edit}
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      value={values.email}
                    />
                  </div>
                </div>

                <br />
                <div className="form-group">
                  <div className="col-xs-12">
                    <button className="btn btn-lg btn-success" type="submit">
                      <i className="glyphicon glyphicon-ok-sign"></i> Lưu
                    </button>
                    &nbsp;
                    <button
                      onClick={handleClick}
                      className="btn btn-lg btn-warning"
                      type="reset"
                    >
                      <i className="glyphicon glyphicon-repeat"></i> Chỉnh sửa
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="tab-pane" id="messages">
              <h2></h2>

              <form
                className="form"
                action="##"
                method="post"
                id="registrationForm"
              >
                <div className="form-group">
                  <div className="col-xs-12">
                    <button className="btn btn-lg btn-success" type="submit">
                      <i className="glyphicon glyphicon-ok-sign"></i> Save
                    </button>
                    <button className="btn btn-lg" type="reset">
                      <i className="glyphicon glyphicon-repeat"></i> Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
