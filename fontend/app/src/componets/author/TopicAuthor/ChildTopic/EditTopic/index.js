import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateChildTopic,
  deleteChildTopic,
} from "../../../../../redux/actions/thunk/childTopic";
import ChildTopicDataService from "../../../../../services/childTopic.service";

const ChildTopic = (props) => {
  const initialChildTopicState = {
    id: null,
    name_topic_child: "",
  };
  const [currentChildTopic, setCurrentChildTopic] = useState(
    initialChildTopicState
  );
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getChildTopic = (id) => {
    ChildTopicDataService.get(id)
      .then((response) => {
        setCurrentChildTopic(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    // console.log(["iiiiii"], props.match.params.id);
    getChildTopic(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentChildTopic({ ...currentChildTopic, [name]: value });
  };

  //   const updateStatus = (status) => {
  //   const data = {
  //     id: currentChildTopic._id,
  //     name_topic_child: currentChildTopic.name_topic_child,
  //   };

  //   dispatch(updateChildTopic(currentChildTopic._id, data))
  //     .then((response) => {
  //       console.log(["kkkkkk"],response);

  //       setCurrentChildTopic({ ...currentChildTopic });
  //       setMessage("The status was updated successfully!");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   };

  const updateContent = () => {
    dispatch(updateChildTopic(currentChildTopic._id, currentChildTopic))
      .then((response) => {
        console.log(response);

        setMessage("The childTopic was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeChildTopic = () => {
    dispatch(deleteChildTopic(currentChildTopic._id))
      .then(() => {
        props.history.push("/author/topic/childTopic");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentChildTopic ? (
        <div className="edit-form">
          <h4>Chủ đề</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Tên chủ đề</label>
              <input
                type="text"
                className="form-control"
                id="name_topic_child"
                name="name_topic_child"
                value={currentChildTopic.name_topic_child}
                onChange={handleInputChange}
              />
            </div>
            &nbsp;
          </form>
          <a
            className="btn btn-danger btn-sm "
            onClick={removeChildTopic}
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

export default ChildTopic;
