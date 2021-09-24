import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateParentTopic,
  deleteParentTopic,
} from "../../../../../redux/actions/thunk/parentTopic";
import ParentTopicDataService from "../../../../../services/parentTopic.service";
import Select from "react-select";
import { childTopic$ } from "../../../../../redux/selector/index";
import { retrieveChildTopic } from "../../../../../redux/actions/thunk/childTopic";

const ParentTopic = (props) => {
  const initialParentTopicState = {
    id: null,
    name_topic_parent: "",
    name_topic_child: [],
    approved: false,
    canceled: false,
  };

  const childTopic = useSelector(childTopic$);
  const [selectedOption, setSelectedOption] = useState([]);
  const [currentParentTopic, setCurrentParentTopic] = useState(
    initialParentTopicState
  );
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  // const getParentTopic = async (id) => {
  //   // console.log(["id fggfgfgfg"], id);
  //   await ParentTopicDataService.get(id)
  //     .then((response) => {
  //       console.log(["response.data"], response.data);
  //       setCurrentParentTopic(response.data);
  //       localStorage.setItem(
  //         "name_topic_child",
  //         JSON.stringify(response.data.name_topic_child)
  //       );
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // useEffect(() => {
  //   getParentTopic(props.match.params.id);
  // }, [props.match.params.id]);

  const getTopic = JSON.parse(localStorage.getItem("name_topic_child"));

  useEffect(() => {
    // console.log(["iiiiii"], props.match.params.id);
    dispatch(retrieveChildTopic());

    // setCurrentParentTopic(getTopic);
    setCurrentParentTopic({
      ...getTopic,
      name_topic_child: selectedOption,
    });
  }, [selectedOption]);

  const parentValueSelected = getTopic["name_topic_child"].map(
    (topic, index) => {
      return {
        label: topic.name_topic_child,
        value: topic._id,
        key: index,
      };
    }
  );

  // // This will run for only during the first render.
  const defaultSelectedValue = React.useMemo(() => {
    // to update the local state
    setSelectedOption(getTopic["name_topic_child"]);
    // console.log(["selectedOption"], selectedOption);
    return parentValueSelected;
  }, []);
  console.log(["selectedOption"], selectedOption);
  // console.log(["parentValueSelected"],parentValueSelected);
  // useEffect(() => {

  // }, []);

  const options = childTopic.map((topic, index) => {
    return {
      label: topic.name_topic_child,
      value: topic._id,
      key: index,
    };
  });

  // const handleOnchange = (e) => {
  //   console.log(["e"], e);
  //   setSelectedOption(Array.isArray(e) ? e.map((x) => x.value) : []);
  // };
  const customStyles = {
    control: (base) => ({
      ...base,
      width: 300,
    }),
    multiValueRemove: (base) => ({ ...base, display: "none" }),
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentParentTopic({ ...currentParentTopic, [name]: value });
  };

  // const handleClick = () => {
  //   // setSelectedOption([]);
  //   // setCurrentParentTopic(initialParentTopicState);
  // };

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
            <Select
              classNamePrefix="select"
              className="basic-single"
              isMulti
              defaultValue={defaultSelectedValue}
              // value={selectedOption}
              isClearable={false}
              onChange={(e) => setSelectedOption(e.map((item) => item.value))}
              options={options}
              name="colors"
              styles={customStyles}
            />
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
          {/* &nbsp;
          <a
            onClick={handleClick}
            className="btn btn-warning btn-sm "
            href="#"
            role="button"
          >
            Reset selection
          </a> */}
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
