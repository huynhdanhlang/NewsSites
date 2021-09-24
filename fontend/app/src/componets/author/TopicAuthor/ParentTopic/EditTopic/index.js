import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateParentTopic,
  deleteParentTopic,
} from "../../../../../redux/actions/thunk/parentTopic";
import { retrieveChildTopic } from "../../../../../redux/actions/thunk/childTopic";


const ParentTopic = (props) => {
  const initialParentTopicState = {
    id: null,
    name_topic_parent: "",
    name_topic_child: [],
    approved: false,
    canceled: false,
  };

  // const [selectedOption, setSelectedOption] = useState([]);
  const [currentParentTopic, setCurrentParentTopic] = useState(
    initialParentTopicState
  );
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getTopic = JSON.parse(localStorage.getItem("name_topic_child"));
  console.log(["getTopic"], getTopic);
  const [inputList, setInputList] = React.useState(
    getTopic["name_topic_child"]
  );
  useEffect(() => {
    // console.log(["iiiiii"], props.match.params.id);
    dispatch(retrieveChildTopic());

    // setCurrentParentTopic(getTopic);
    setCurrentParentTopic({
      ...getTopic,
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
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { _id: null, topic: "" }]);
  };

  const updateContent = () => {
    dispatch(updateParentTopic(currentParentTopic._id, currentParentTopic))
      .then((response) => {
        // console.log(response);
        setMessage("The parentTopic was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //   options.filter((obj) =>
  //   selectedOption.includes(obj.value)
  // )

  const removeParentTopic = () => {
    dispatch(deleteParentTopic(currentParentTopic._id))
      .then(() => {
        props.history.push("/author/topic/topicParent");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleClick = () => {
    setCurrentParentTopic(initialParentTopicState);
    setInputList(getTopic["name_topic_child"]);
  };

  return (
    <div>
      {currentParentTopic ? (
        <div className="edit-form">
          <h4>Chủ đề</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Tên chủ đề</label>
              <input
                type="text"
                className="form-control"
                id="name_topic_parent"
                name="name_topic_parent"
                value={currentParentTopic.name_topic_parent}
                onChange={handleInputChange}
              />
            </div>
            &nbsp;
            <label htmlFor="name_parent">Thẻ chủ đề:</label>
            {inputList.map((topic, i) => {
              return (
                <div>
                  &nbsp;
                  <input
                    key={i}
                    type="text"
                    className="form-control"
                    id="name_topic_child"
                    required
                    value={topic.topic}
                    onChange={(e) => handleInputChangeTopic(e, i)}
                    name="topic"
                  />
                  <div>
                    {inputList.length !== 1 && (
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
            <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
            &nbsp;
          </form>
          <a
            className="btn btn-danger btn-sm "
            onClick={removeParentTopic}
            href="#"
            role="button"
          >
            Xóa{" "}
          </a>
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
