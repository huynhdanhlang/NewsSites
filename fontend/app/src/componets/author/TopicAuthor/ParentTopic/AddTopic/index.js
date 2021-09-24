import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { childTopic$ } from "../../../../../redux/selector/index";
import { retrieveChildTopic } from "../../../../../redux/actions/thunk/childTopic";
import { createcParentTopic } from "../../../../../redux/actions/thunk/parentTopic";

export default function AddTopic() {
  //ChildTopic
  const childTopic = useSelector(childTopic$);
  const [selectedOption, setSelectedOption] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(retrieveChildTopic());
    // console.log(childTopic);
    setParentTopic({
      ...parentTopic,
      name_topic_child: selectedOption,
    });
    console.log("jjsjjs", selectedOption);
  }, [selectedOption]);

  const options = childTopic.map((topic, index) => {
    return {
      label: topic.name_topic_child,
      value: topic._id,
      key: index,
    };
  });

  const customStyles = {
    control: (base) => ({
      ...base,
      width: 300,
    }),
    multiValueRemove: (base) => ({ ...base, display: "none" }),
  };

  //ParentTopic
  const inittialParentTopic = {
    id: null,
    name_topic_parent: "",
    name_topic_child: [],
    approved: false,
    canceled: false,
  };

  const [parentTopic, setParentTopic] = React.useState(inittialParentTopic);
  const [submited, setSubmited] = React.useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setParentTopic({ ...parentTopic, [name]: value });
  };

  const handleOnchange = (e) => {
    console.log(e);
    setSelectedOption(Array.isArray(e) ? e.map((x) => x.value) : []);

  };

  const saveParentTopic = () => {
    const { name_topic_parent, name_topic_child } = parentTopic;

    dispatch(createcParentTopic(name_topic_parent, name_topic_child))
      .then((data) => {
        setParentTopic({
          id: data.id,
          name_topic_parent: data.name_topic_parent,
          name_topic_child: data.name_topic_child,
        });

        setSubmited(true);

        console.log(["parent", data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newParentTopic = () => {
    setParentTopic(inittialParentTopic);
    setSubmited(false);
  };

  const handleClick = () => {
    setSelectedOption([]);
    setParentTopic(inittialParentTopic);
  };

  return (
    <div className="submit-form">
      {submited ? (
        <div>
          <h4>Bạn đã thêm chủ đề thành công!</h4>
          <a
            onClick={newParentTopic}
            className="btn btn-success btn-sm "
            href="#"
            role="button"
          >
            Thêm
          </a>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name_parent">Chủ đề:</label>
            <input
              type="text"
              className="form-control"
              id="name_topic_parent"
              required
              value={parentTopic.name_topic_parent}
              onChange={handleInputChange}
              name="name_topic_parent"
            />
          </div>
          <label htmlFor="tag_select">Thẻ chủ đề:</label>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Select
              classNamePrefix="select"
              className="basic-single"
              isMulti
              value={options.filter((obj) =>
                selectedOption.includes(obj.value)
              )}
              isClearable={false}
              onChange={handleOnchange}
              options={options}
              name="colors"
              styles={customStyles}
            />
          </div>
          <p></p>
          <a
            onClick={saveParentTopic}
            className="btn btn-success btn-sm "
            href="#"
            role="button"
          >
            Thêm
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
        </div>
      )}
    </div>
  );
}
