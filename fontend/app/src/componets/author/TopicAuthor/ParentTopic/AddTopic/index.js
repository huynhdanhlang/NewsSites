import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { childTopic$ } from "../../../../../redux/selector/index";
import { retrieveChildTopic } from "../../../../../redux/actions/thunk/childTopic";
import { createcParentTopic } from "../../../../../redux/actions/thunk/parentTopic";
import { userState$ } from "../../../../../redux/selector/index";

export default function AddTopic() {
  //ChildTopic
  const childTopic = useSelector(childTopic$);
  const [selectedOption, setSelectedOption] = React.useState([]);
  const [inputList, setInputList] = React.useState([
    { id: null, name_topic: "", isChecked: false },
  ]);
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector(userState$);

  React.useEffect(() => {
    dispatch(retrieveChildTopic());
    // console.log(childTopic);
    setParentTopic({
      ...parentTopic,
      name_topic: selectedOption.label,
      name_topic_child: inputList,
    });
    console.log("jjsjjs", selectedOption);
  }, [selectedOption.label, inputList]);

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
    name_topic: "",
    name_topic_child: [],
    author: currentUser.id,
    isChecked: false,
    canceled: false,
    isExpanded: true,
  };

  const [parentTopic, setParentTopic] = React.useState(inittialParentTopic);
  const [submited, setSubmited] = React.useState(false);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log(["parentTopic"], parentTopic);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { id: null, name_topic: "", isChecked: false },
    ]);
  };

  const handleOnchange = (e) => {
    console.log(e);
    setSelectedOption(e);
  };

  const saveParentTopic = () => {
    const { name_topic, name_topic_child } = parentTopic;

    dispatch(createcParentTopic(name_topic, name_topic_child))
      .then((data) => {
        setParentTopic({
          id: data.id,
          name_topic: data.name_topic,
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
    setInputList([{ id: null, name_topic: "", isChecked: false }]);
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
            <label htmlFor="tag_select">Chủ đề:</label>
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
                isMulti={false}
                value={selectedOption}
                isClearable={false}
                onChange={handleOnchange}
                options={options}
                name="colors"
                styles={customStyles}
              />
            </div>
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
                      onChange={(e) => handleInputChange(e, i)}
                      name="name_topic"
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
            </div>
            <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
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
