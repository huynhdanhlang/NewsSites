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

  console.log(["parentTopic"], parentTopic);

  React.useEffect(async () => {
    getParentTopic();
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

  console.log(["data_update"], data);
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
  }, [data, data["name_topic_child"]]);

  return (
    <Container maxWidth={false} className="container">
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
          <div className="list row">
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
          <SuperTreeView
            keywordChildren={"name_topic_child"}
            keywordLabel={"name_topic"}
            keywordKey={"_id"}
            data={data}
            onUpdateCb={(updatedData) => {
              setData(updatedData);
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
