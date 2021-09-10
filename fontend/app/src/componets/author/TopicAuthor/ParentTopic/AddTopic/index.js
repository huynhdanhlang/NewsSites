import React from "react";
import { useDispatch } from "react-redux";
import { createcParentTopic } from "../../../../../redux/actions/thunk/parentTopic";

export default function AddTopic() {
  const initialParentTopicState = {
    _id: null,
    name_topic_parent: "",
    name_topic_parent: "",
    approved: false,
    canceled: false,
  };

  const [parentTopic, setParentTopic] = React.useState(initialParentTopicState);
  const [submited, setSubmited] = React.useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setParentTopic({ ...parentTopic, [name]: value });
  };

  const saveParentTopic = () => {
    const { name_topic_parent } = parentTopic;

    dispatch(createcParentTopic(name_topic_parent))
      .then((data) => {
        setParentTopic({
          _id: data._id,
          name_topic_parent: data.name_topic_parent,
        });

        setSubmited(true);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const newParentTopic = () => {
    setParentTopic(initialParentTopicState);
    setSubmited(false);
  };

  return (
    <div className="submit-form">
      {submited ? (
        <div>
          <h4>You submitted successfully</h4>
          <a
            className="btn btn-success btn-sm "
            href="#"
            role="button"
            onClick={newParentTopic}
          >
            Thêm
          </a>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Tên chủ đề</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={parentTopic.name}
              className="form-control"
              onChange={handleInputChange}
            />&nbsp;
          </div>
          <a
            onClick={saveParentTopic}
            className="btn btn-success btn-sm "
            href="#"
            role="button"
          >
            Gửi
          </a>
        </div>
      )}
    </div>
  );
}
