import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateParentTopic,
  deleteParentTopic,
} from "../../../../../redux/actions/thunk/parentTopic";

import { deleteTopicTag } from "../../../../../redux/actions/thunk/listTopic";
import { retrieveChildTopic } from "../../../../../redux/actions/thunk/childTopic";
import ParentTopicDataService from "../../../../../services/parentTopic.service";
// import { Grid } from "@material-ui/core";

const ParentTopic = (props) => {
  // const initialParentTopicState = {
  //   id: null,
  //   name_topic_parent: "",
  //   name_topic_child: [],
  //   approved: false,
  //   canceled: false,
  // };

  // const [selectedOption, setSelectedOption] = useState([]);
  const getTopic = JSON.parse(localStorage.getItem("name_topic"));
  const [currentParentTopic, setCurrentParentTopic] = useState(getTopic);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  console.log(["getTopic"], getTopic);
  const [inputList, setInputList] = React.useState(
    getTopic["name_topic_child"]
  );

  const getParentTopic = async (id) => {
    // console.log(["id fggfgfgfg"], id);
    await ParentTopicDataService.get(id)
      .then((response) => {
        console.log(id, response.data);
        localStorage.setItem("name_topic", JSON.stringify(response.data));
        setTimeout(window.location.reload(), 2000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    // console.log(["iiiiii"], props.match.params.id);
    dispatch(retrieveChildTopic());

    // setCurrentParentTopic(getTopic);
    setCurrentParentTopic({
      ...currentParentTopic,
      name_topic_child: inputList,
    });
  }, [inputList]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentParentTopic({ ...currentParentTopic, [name]: value });
  };

  const handleInputChangeTopic = (event, index) => {
    const { name, value } = event.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    console.log(
      [`currentParentTopic["name_topic_child"][index]._id`],
      currentParentTopic["name_topic_child"][index]._id
    );
    try {
      dispatch(
        deleteTopicTag(currentParentTopic["name_topic_child"][index]._id)
      );
    } catch (error) {}
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { _id: null, name_topic: "", isChecked: false },
    ]);
  };

  const updateContent = () => {
    dispatch(updateParentTopic(currentParentTopic._id, currentParentTopic))
      .then(async (response) => {
        // console.log(response);
        setMessage("The parentTopic was updated successfully!");
        await getParentTopic(currentParentTopic._id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //   options.filter((obj) =>
  //   selectedOption.includes(obj.value)
  // )

  const removeParentTopic = () => {
    dispatch(deleteParentTopic(currentParentTopic._id));
    props.history.push("/author/topic/topicParent");
  };
  const handleClick = () => {
    setCurrentParentTopic(getTopic);
    setInputList(getTopic["name_topic_child"]);
  };

  return (
    <div>
      &nbsp;
      {currentParentTopic ? (
        <div className="edit-form">
          <h4>Chủ đề</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Tên chủ đề</label>
              <input
                type="text"
                className="form-control"
                id="name_topic"
                name="name_topic"
                value={currentParentTopic.name_topic}
                onChange={handleInputChange}
              />
            </div>
            &nbsp;
            <div
              style={{
                overflow: "auto",
                height: 200,
                display: "block",
                maxWidth: 300,
              }}
            >
              <label htmlFor="name_parent">Thẻ chủ đề:</label>
              {inputList.map((topic, i) => {
                return (
                  <div>
                    &nbsp;
                    <input
                      key={i}
                      type="text"
                      className="form-control"
                      id="name_topic"
                      required
                      value={topic.name_topic}
                      onChange={(e) => handleInputChangeTopic(e, i)}
                      name="name_topic"
                    />
                    <div>
                      {inputList.length !== 1 && !topic.isChecked && (
                        <a
                          onClick={() => handleRemoveClick(i)}
                          className="btn btn-danger btn-sm "
                          href="#"
                          role="button"
                        >
                          Xóa
                        </a>
                      )}
                      &nbsp;
                      {inputList.length - 1 === i && (
                        <a
                          onClick={handleAddClick}
                          className="btn btn-primary btn-sm "
                          href="#"
                          role="button"
                        >
                          Thêm{" "}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
            &nbsp;
          </form>
          {!currentParentTopic.isChecked && (
            <a
              className="btn btn-danger btn-sm "
              onClick={removeParentTopic}
              href="#"
              role="button"
            >
              Xóa{" "}
            </a>
          )}
          &nbsp;
          <a
            className="btn btn-success btn-sm "
            onClick={updateContent}
            href="#"
            role="button"
          >
            Cập nhật
          </a>
          &nbsp;
          <a
            onClick={handleClick}
            className="btn btn-danger btn-sm "
            href="#"
            role="button"
          >
            Reset
          </a>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default ParentTopic;
