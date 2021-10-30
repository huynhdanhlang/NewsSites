import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createcChildTopic } from "../../../../../redux/actions/thunk/childTopic";
import { userState$ } from "../../../../../redux/selector/index";

export default function AddTopic() {
  const { user: currentUser } = useSelector(userState$);

  const initialChildTopicState = {
    id: null,
    name_topic_child: "",
    author: currentUser.id,
  };

  const [childTopic, setChildTopic] = React.useState(initialChildTopicState);
  const [submited, setSubmited] = React.useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChildTopic({ ...childTopic, [name]: value });
  };

  const saveChildTopic = () => {
    const { name_topic_child, author } = childTopic;
    console.log(["childTopic"], childTopic);
    dispatch(createcChildTopic(name_topic_child, author))
      .then((data) => {
        setChildTopic({
          _id: data._id,
          name_topic_child: data.name_topic_child,
          author: data.author,
        });

        setSubmited(true);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const newChildTopic = () => {
    setChildTopic(initialChildTopicState);
    setSubmited(false);
  };

  return (
    <div className="submit-form">
      {submited ? (
        <div>
          <h4>Bạn đã thêm chủ đề thành công!</h4>
          <a
            className="btn btn-success btn-sm "
            href="#"
            role="button"
            onClick={newChildTopic}
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
              name="name_topic_child"
              id="name_topic_child"
              required
              value={childTopic.name_topic_child}
              className="form-control"
              onChange={handleInputChange}
            />
            &nbsp;
          </div>

          <a
            onClick={saveChildTopic}
            className="btn btn-success btn-sm "
            href="#"
            role="button"
          >
            Thêm
          </a>
        </div>
      )}
      &nbsp;
    </div>
  );
}
