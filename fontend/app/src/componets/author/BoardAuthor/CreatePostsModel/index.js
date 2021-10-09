import React from "react";
import { Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import Select from "react-select";
import { TextField, Button } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { hideModal, createPosts } from "../../../../redux/actions/saga/posts";
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { userState$, modalState$ } from "../../../../redux/selector/index";
import { retrieveParentTopic } from "../../../../redux/actions/thunk/parentTopic";
import { parentTopic$ } from "../../../../redux/selector/index";

function CreatePostsModel() {
  const classes = useStyles();
  const dispatch = useDispatch(modalState$);
  const { user: currentUser } = useSelector(userState$);
  const editor = useRef(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectChild, setSelectChild] = useState([]);
  const parentTopic = useSelector(parentTopic$);

  React.useEffect(() => {
    dispatch(retrieveParentTopic());
    setData({
      ...data,
      name_topic: selectedOption.value,
      name_topic_child: selectChild.value,
    });
  }, [dispatch, selectedOption, selectChild]);

  var options = parentTopic.map((topic, index) => {
    console.log(["test"], topic);
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

  console.log(["jjj"], options);

  var optionsChild = [];
  parentTopic.map((topic) => {
    if (selectedOption.label === topic.name_topic) {
      optionsChild = topic["name_topic_child"].map((child, index) => {
        if (child.isChecked) {
          return {
            label: child.name_topic,
            value: child._id,
            key: index,
          };
        }
      });
    }
  });

  optionsChild = optionsChild.filter(function (element) {
    return element !== undefined;
  });
  console.log(["selectedOptionChild"], optionsChild);

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

  const [data, setData] = useState({
    title: "",
    content: "",
    attachment: "",
    name_topic: "",
    name_topic_child: "",
    author: currentUser.id,
  });

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    dispatch(createPosts.createPostsRequest(data));
    setTimeout(window.location.reload(), 5000);
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

  const body = (
    <div className={classes.paper} id="simple-modal-title">
      <h2>Thêm tin mới</h2>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          className={classes.title}
          required
          label="Tiêu đề tin"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        {/* <label htmlFor="tag_select">Chủ đề:</label>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
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
        {/* </div> */}
        {/* <div className={classes.outer}> */}
        <JoditEditor
          ref={editor}
          value={data.content}
          config={config}
          tabIndex={-1} // tabIndex of textarea
          onBlur={(newContent) => setData({ ...data, content: newContent })} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
        {/* </div> */}
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
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
  const { isShow } = useSelector(modalState$);

  return (
    <div>
      <Modal  disableEnforceFocus={true} open={isShow} onClose={onClose}>
        {body}
      </Modal>
    </div>
  );
}

export default CreatePostsModel;
