import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { parentTopic$ } from "../../../redux/selector/index";
// import { findByNameParentTopic } from "../../../redux/actions/thunk/parentTopic";
import "./style.css";
import ParentTopicDataService from "../../../services/parentTopic.service";
import { Container } from "@material-ui/core";
import SuperTreeView from "react-super-treeview";
import "react-super-treeview/dist/style.css";
import { updateParentTopic } from "../../../redux/actions/thunk/parentTopic";
import { Modal } from "@material-ui/core";
import { sendMailPopup$ } from "../../../redux/selector/index";

import {
  showMailPopup,
  hideMailPopup,
} from "../../../redux/actions/saga/topic";

export default function ListTopic() {
  const [searchName, setSearchName] = useState("");
  const [data, setData] = useState([]);
  const { isShowPopup } = useSelector(sendMailPopup$);
  const dispatch = useDispatch();

  // console.log(["parentTopic"], parentTopic);
  const openMailPopup = React.useCallback(() => {
    dispatch(showMailPopup());
  }, [dispatch]);

  const [mailerState, setMailerState] = useState({
    name: "V/v Phản hồi xét duyệt chủ đề",
    email: "",
    message: "",
  });

  React.useEffect(async () => {
    await getParentTopic();
    document.querySelectorAll("input[type=checkbox]").forEach((each) => {
      each.setAttribute("disabled", "disabled");
    });
  }, []);

  const index = JSON.parse(localStorage.getItem("topicIndex"));

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

  const onChangeSearchName = (e) => {
    const SearchName = e.target.value;
    setSearchName(SearchName);
  };

  const findByName = async () => {
    await ParentTopicDataService.findByName(searchName)
      .then((response) => {
        console.log(["searchName"], response.data);
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    var arr = [...data];
    arr[index] = { ...arr[index], feedback: e.target.value };
    setData(arr);
  }

  const onClose = React.useCallback(() => {
    dispatch(hideMailPopup());
  }, [dispatch]);

  // console.log(["data_update"], data);
  React.useEffect(() => {
    // const treechildview = document.getElementsByClassName(
    //   "super-treeview-children-container"
    // );

    document.querySelectorAll(".delete-btn").forEach((child) => {
      child.remove();
    });

    const children = document.querySelectorAll(".super-treeview-node-content");
    console.log(children);

    for (let i = 0; i < children.length; i++) {
      var div = document.createElement("div");
      div.className = "delete-btn";

      var a = document.createElement("a");
      a.className = "btn btn-info btn-sm";
      a.role = "button";
      a.innerText = "Xét duyệt";
      const button = document.querySelectorAll(".btn-info");
      for (let i = 0; i < button.length; i++) {
        (function (index) {
          button[i].addEventListener("click", myScript);
          function myScript() {
            openMailPopup();
            localStorage.setItem("topicIndex", JSON.stringify(index));
            setMailerState((prevState) => ({
              ...prevState,
              ["email"]: data[index]["author"].email,
            }));
          }
        })(i);
      }
      div.appendChild(a);
      for (let j = 0; j < data.length; j++) {
        console.log(["data"], data);
        const x = children[i].innerText.split("\n");
        console.log(x[0]);
        if (data[j].name_topic === x[0]) {
          children[i].appendChild(div);
        }
      }
    }
  }, [data, data["name_topic_child"]]);

  const handleClickSend = () => {
    document.querySelectorAll("input[type=checkbox]").forEach((each) => {
      // console.log(["each"], each);
      if (each.hasAttribute("disabled")) {
        each.removeAttribute("disabled");
        document.querySelectorAll("a.btn-danger")[0].innerText =
          "Đóng xét duyệt";
      } else {
        each.setAttribute("disabled", "disabled");
        document.querySelectorAll("a.btn-danger")[0].innerText = "Mở xét duyệt";
      }
    });
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    onClose();
    console.log(["data_send"], data);
    dispatch(updateParentTopic(data[index]._id, data[index]));
    console.log({ mailerState });
    const response = await fetch("http://localhost:8080/api/sendmail", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ mailerState }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === "success") {
          alert("Phản hồi của bạn đã được gửi đến tác giả!");
        } else if (resData.status === "fail") {
          alert("Message failed to send");
        }
      })
      .then(() => {
        setMailerState({
          name: "V/v Phản hồi xét duyệt chủ đề",
          email: data[index]["author"].email,
          message: "",
        });
      });
  };

  return (
    <Container maxWidth={false} className="container">
      <div>
        <h3 style={{ textAlign: "center" }}>Xét duyệt chủ đề</h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            //   minWidth: "165px",
            width: "50%",
            height: "fit-content",
            background: "white",
            padding: "3%",
            marginTop: "20px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="list row"
          >
            <div className="col-md-8">
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
          </div>
          &nbsp;
          <a
            onClick={handleClickSend}
            className="btn btn-danger btn-sm "
            href="#"
            role="button"
          >
            {" "}
            Mở xét duyệt
          </a>
          <SuperTreeView
            keywordChildren={"name_topic_child"}
            keywordLabel={"name_topic"}
            keywordKey={"_id"}
            data={data}
            onUpdateCb={(updatedData) => {
              setData(updatedData);
            }}
            isDeletable={(node, depth) => {
              // Only show Delete button on root level
              // which is depth = 0
              // NOTE: The highest/root depth is 0, node children are depth+1
              // if (depth == 0) {
              //   return true;
              // } else {
              //   return false;
              // }
            }}
            onCheckToggleCb={(nodes) => {
              const checkState = nodes[0].isChecked;

              applyCheckStateTo(nodes);

              function applyCheckStateTo(nodes) {
                nodes.forEach((node) => {
                  node.isChecked = checkState;
                  if (node.name_topic_child) {
                    applyCheckStateTo(node.name_topic_child);
                  }
                });
              }
            }}
          />
        </div>
      </div>
      <Modal open={isShowPopup}>
        <form
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <fieldset
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
            }}
          >
            <legend style={{ textAlign: "center" }}>Phản hồi tác giả </legend>
            <input
              placeholder="Name"
              onChange={handleStateChange}
              name="name"
              value={mailerState.name}
            />
            <input
              placeholder="Email"
              readOnly={true}
              // onChange={handleStateChange}
              name="email"
              value={mailerState.email}
            />
            <textarea
              style={{ minHeight: "200px" }}
              placeholder="Message"
              onChange={handleStateChange}
              name="message"
              value={mailerState.message}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a
                onClick={submitEmail}
                className="btn btn-success btn-sm "
                href="#"
                role="button"
              >
                Gửi{" "}
              </a>
              <a
                onClick={onClose}
                className="btn btn-warning btn-sm "
                href="#"
                role="button"
              >
                Đóng{" "}
              </a>
            </div>
          </fieldset>
        </form>
      </Modal>
    </Container>
  );
}
