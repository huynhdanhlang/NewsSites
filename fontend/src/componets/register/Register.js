import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { rolesState$ } from "../../redux/selector/index";
import { retrieveAllRoles } from "../../redux/actions/thunk/roles";
import { register } from "../../redux/actions/thunk/auth";

const optionsS = ["Tác giả", "Kiểm duyệt viên", "Quản trị viên"];
const customStyles = {
  control: (base) => ({
    ...base,
    width: 270,
  }),
  multiValueRemove: (base) => ({ ...base, display: "none" }),
};
//const [selectedOption, setSelectedOption] = React.useState([]);

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Trường bắt buộc.Vui lòng nhập!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Email không hợp lệ.Vui lòng nhập lại!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Tên người dùng phải từ 3 đên 25 ký tự
      </div>
    );
  }
};

// const vfullname = (value) => {
//   if (typeof value != "string") {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Họ và tên phải là ký tự
//       </div>
//     );
//   }
// };

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Mật khẩu phải từ 6 đến 40 ký tự
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const roles = useSelector(rolesState$);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const handleOnchange = (e) => {
    console.log(e);
    setSelectedOption(e);
  };

  React.useEffect(() => {
    dispatch(retrieveAllRoles());
  }, []);

  const options = roles.map((topic, index) => {
    return {
      label: topic.name,
      value: topic._id,
      key: index,
    };
  });

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

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(
        register(fullname, username, email, password, selectedOption.label)
      )
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="fullname">Họ và tên</label>
                <Input
                  type="text"
                  className="form-control"
                  name="fullname"
                  value={fullname}
                  onChange={onChangeFullname}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Tên người dùng</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <label htmlFor="select">Vai trò</label>
              <div
                className="form-group"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Select
                  classNamePrefix="select"
                  className="basic-single"
                  isMulti={false}
                  value={selectedOption}
                  isClearable={false}
                  onChange={handleOnchange}
                  options={options}
                  name="colors"
                  styles={customStyles}
                />
              </div>
              &nbsp;
              <div
                className="form-group"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button className="btn btn-primary btn-block">Xác nhận</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
