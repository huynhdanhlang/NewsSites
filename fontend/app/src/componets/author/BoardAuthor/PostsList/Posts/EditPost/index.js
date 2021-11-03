import React from "react";
import { Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import { TextField, Button } from "@material-ui/core";
import FileBase64 from "react-file-base64";

import {
  hideModalEdit,
  updatePosts,
} from "../../../../../../redux/actions/saga/posts";
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { modalEditState$ } from "../../../../../../redux/selector/index";
import { retrieveParentTopic } from "../../../../../../redux/actions/thunk/parentTopic";
import { parentTopic$ } from "../../../../../../redux/selector/index";
import Select from "react-select";
import PostUpdate from "../../../../../../services/posts.service";
import { history } from "../../../../../../helpers/history";

const EditPostsModel = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch(modalEditState$);
  const parentTopic = useSelector(parentTopic$);

  console.log(
    ["parentTopic"],
    parentTopic[0]["name_topic_child"][0].name_topic
  );
  console.log(["post", post]);

  var name = [];
  parentTopic.map((topic) => {
    // console.log(["post"], post);

    if (post["name_topic"]._id === topic._id) {
      console.log(["topic"], topic);
      name.push({
        name: topic.name_topic,
        _id: topic._id,
      });
      topic["name_topic_child"].map((child) => {
        if (post["name_topic_child"]._id === child._id) {
          name.push({
            name: child.name_topic,
            _id: child._id,
          });
        }
      });
    }
  });
  console.log(["name"], name);

  const [selectedOption, setSelectedOption] = useState([
    {
      label: name[0].name,
      value: name[0]._id,
      key: 0,
    },
  ]);

  const [selectChild, setSelectChild] = useState([
    {
      label: name[1].name,
      value: name[1]._id,
      key: 0,
    },
  ]);
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    placeholder: "Nội dung...",
    enableDragAndDropFileToEditor: true,
    uploader: { insertImageAsBase64URI: true },
    toolbar: true,
    editorCssClass: "jodit-workplace",
    allowTabNavigation: true,
    askBeforePasteHTML: false,
  };

  // const post = JSON.parse(sessionStorage.getItem("postId"));
  const [data, setData] = useState(post);

  React.useEffect(() => {
    // dispatch(retrieveParentTopic());
    setData({
      ...data,
      name_topic: selectedOption.value,
      name_topic_child: selectChild.value,
    });
  }, [dispatch, selectedOption, selectChild]);
  console.log(["data-post", data]);

  var options = parentTopic.map((topic, index) => {
    if (topic.isChecked) {
      return {
        label: topic.name_topic,
        value: topic._id,
        key: index,
      };
    }
  });

  options = options.filter(function (element) {
    return element !== undefined;
  });

  var optionsChild = [];
  parentTopic.map((topic) => {
    if (topic.isChecked) {
      if (selectedOption.label === topic.name_topic) {
        optionsChild = topic["name_topic_child"].map((child, index) => {
          if (topic.isChecked) {
            return {
              label: child.name_topic,
              value: child._id,
              key: index,
            };
          }
        });
      }
    }
  });

  optionsChild = optionsChild.filter(function (element) {
    return element !== undefined;
  });

  console.log(["data"], parentTopic);

  // const onClose = React.useCallback(() => {
  //   dispatch(hideModalEdit());
  // }, [dispatch]);

  const getParentTopic = async (data) => {
    // console.log(["id fggfgfgfg"], id);
    await PostUpdate.updatePost(data)
      .then((response) => {
        setTimeout(window.location.reload(), 1000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSubmit = React.useCallback(() => {
    getParentTopic(data);
    // dispatch(updatePosts.updatePostsRequest(data));
  }, [dispatch, data]);

  const customStyles = {
    control: (base) => ({
      ...base,
      width: "100%",
    }),
    multiValueRemove: (base) => ({ ...base, display: "none" }),
  };

  const handleOnchange = (event) => {
    console.log(["event", event]);
    setSelectedOption(event);
    setSelectChild([]);
  };

  const handleOnchangeChild = (event) => {
    console.log(["eventChild", event]);
    setSelectChild(event);
  };

  const onBack = React.useCallback(() => {
    dispatch(hideModalEdit());
    history.push("/author/posts");
  }, []);

  const body = (
    // <div className={classes.paper} id="simple-modal-title">
    // <h2>Thêm tin mới</h2>
    <form noValidate autoComplete="off" className={classes.form}>
      <TextField
        className={classes.title}
        required
        label="Tiêu đề tin"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />
      <label htmlFor="parenttopic">Chủ đề:</label>
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
      <label htmlFor="childtopic">Thẻ chủ đề:</label>
      <Select
        classNamePrefix="select"
        className="basic-single"
        isMulti={false}
        value={selectChild}
        isClearable={false}
        onChange={handleOnchangeChild}
        options={optionsChild}
        name="colors"
        styles={customStyles}
      />
      <label htmlFor="content">Nội dung:</label>
      <JoditEditor
        ref={editor}
        value={data.content}
        config={config}
        tabIndex={-1} // tabIndex of textarea
        onBlur={(newContent) => setData({ ...data, content: newContent })} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
      <label htmlFor="image">Ảnh bản tin:</label>
      <FileBase64
        accept="image/*"
        multiple={false}
        type="file"
        value={data.attachment}
        onDone={({ base64 }) => setData({ ...data, attachment: base64 })}
      />
      <div className={classes.footer}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          fullwidth="true"
          onClick={onSubmit}
        >
          Cập nhật
        </Button>
        &nbsp;
        <Button
          variant="contained"
          color="primary"
          component="span"
          fullwidth="true"
          onClick={onBack}
        >
          Quay lại
        </Button>
      </div>
    </form>
    // </div>
  );
  const { isShowEdit } = useSelector(modalEditState$);

  return (
    <div>
      {/* <Modal disableEnforceFocus={true} open={isShowEdit} onClose={onClose}> */}
      {body}
      {/* </Modal> */}
    </div>
  );
};

export default EditPostsModel;
