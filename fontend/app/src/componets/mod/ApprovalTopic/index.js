import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parentTopic$ } from "../../../redux/selector/index";
import { findByNameParentTopic } from "../../../redux/actions/thunk/parentTopic";

import ParentTopicDataService from "../../../services/parentTopic.service";
import { Container } from "@material-ui/core";
import SuperTreeView from "react-super-treeview";
import "react-super-treeview/dist/style.css";
import { updateParentTopic } from "../../../redux/actions/thunk/parentTopic";

export default function ListTopic() {
  const [searchName, setSearchName] = useState("");
  const [data, setData] = useState([]);

  const parentTopic = useSelector(parentTopic$);
  const dispatch = useDispatch();

  // console.log(["parentTopic"], parentTopic);

  React.useEffect(async () => {
    await getParentTopic();

    document.querySelectorAll("input").forEach((each) => {
      // console.log(["each"], each);
      each.setAttribute("disabled", "disabled");
    });

    document.querySelectorAll("a").forEach((each) => {
      console.log(["a"], each);
      each.setAttribute("disabled", "disabled");
    });
  }, []);

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

  // console.log(["data_update"], data);
  React.useEffect(() => {
    data.map((topic) => {
      console.log(["topic_update"], topic);
      if (
        topic.isChecked ||
        (topic.isChecked && topic.isExpanded) ||
        (topic.isExpanded && !topic.isChecked) ||
        (topic.isExpanded &&
          !topic.isChecked &&
          !topic["name_topic_child"].isChecked)
      ) {
        dispatch(updateParentTopic(topic._id, topic));
      }
    });

    const treeview = document.getElementsByClassName(
      "super-treeview-node-content"
    );

    console.log(["data_topic"], data);
    for (let i = 0; i < treeview.length; i++) {
      var input = document.createElement("input");
      input.type = "text";
      input.className = "css-class-name"; // set the CSS class
      var a = document.createElement("a");
      {
        /* <a class="btn btn-info btn-sm " href="#" role="button"> </a> */
      }
      a.className = "btn btn-info btn-sm";
      a.href = "javascript:void";
      a.role = "button";
      a.innerText = "Gửi";
      var label = document.createElement("label");
      label.innerText = "Nội dung: ";
      label.appendChild(input);
      label.appendChild(a);
      for (let j = 0; j < data.length; j++) {
        console.log(["data"], data);
        if (data[j].name_topic === treeview[i].innerText) {
          treeview[i].appendChild(label);
        }
      }
    }
    console.log(["trêview"], treeview);
  }, [data, data["name_topic_child"]]);

  const handleClickSend = () => {
    document.querySelectorAll("input").forEach((each) => {
      // console.log(["each"], each);
      if (each.hasAttribute("disabled")) {
        each.removeAttribute("disabled");
      } else {
        each.setAttribute("disabled", "disabled");
      }
    });
    document.querySelectorAll("a").forEach((each) => {
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
            // style={{
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
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
            class="btn btn-danger btn-sm "
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
              // if (depth==0 || depth==1) {
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
    </Container>
  );
}
