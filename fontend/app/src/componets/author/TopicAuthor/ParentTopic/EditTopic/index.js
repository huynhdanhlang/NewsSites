import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateParentTopic,
  deleteParentTopic,
} from "../../../../../redux/actions/thunk/parentTopic";
import ParentTopicDataService from "../../../../../services/parentTopic.service";

const ParentTopic = (props) => {
  const initialParentTopicState = {
    id: null,
    name_topic_parent: "",
    name_topic_child: [],
    approved: false,
    canceled: false,
  };

  const [currentParentTopic, setCurrentParentTopic] = useState(
    initialParentTopicState
  );
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getParentTopic = (id) => {
    console.log(["id fggfgfgfg"], id);
    ParentTopicDataService.get(id)
      .then((response) => {
        setCurrentParentTopic(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    // console.log(["iiiiii"], props.match.params.id);
    getParentTopic(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentParentTopic({ ...currentParentTopic, [name]: value });
  };

  //   const updateStatus = (status) => {
  //   const data = {
  //     id: currentParentTopic._id,
  //     name_topic_child: currentParentTopic.name_topic_child,
  //   };

  //   dispatch(updateParentTopic(currentParentTopic._id, data))
  //     .then((response) => {
  //       console.log(["kkkkkk"],response);

  //       setCurrentParentTopic({ ...currentParentTopic });
  //       setMessage("The status was updated successfully!");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   };

  const updateContent = () => {
    dispatch(updateParentTopic(currentParentTopic._id, currentParentTopic))
      .then((response) => {
        console.log(response);

        setMessage("The parentTopic was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeParentTopic = () => {
    dispatch(deleteParentTopic(currentParentTopic._id))
      .then(() => {
        props.history.push("/author/topic/topicParent");
      })
      .catch((e) => {
        console.log(e);
      });
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
