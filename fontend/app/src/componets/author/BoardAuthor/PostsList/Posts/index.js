import React from "react";
import useStyles from "./style";
import { useDispatch, useSelector } from "react-redux";

import { Menu, MenuItem } from "@material-ui/core";
// import PostService from "../../../../../services/posts.service";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import AlertDialog from "./Dialog/index";
import moment from "moment";
import { showModalEdit } from "../../../../../redux/actions/saga/posts";
import { showDialog } from "../../../../../redux/actions/saga/posts";
import { showDialogState$ } from "../../../../../redux/selector/index";

const ITEM_HEIGHT = 48;

export default function Post({ post, index }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log(["post"], post);
  const [h2state, seth2State] = React.useState(null);
  var options;
  if (post.isChecked) {
    options = ["Chỉnh sửa"];
  } else {
    options = ["Xóa", "Chỉnh sửa"];
  }

  React.useEffect(() => {
    try {
      const span = document.createElement("span");
      const h2 = post.content;
      span.innerHTML = h2;
      const h2Get = span.querySelector("h2").textContent;

      const spanElement = document.createElement("span");
      spanElement.innerText = h2Get;
      const h2Element = document.createElement("h2");
      h2Element.append(spanElement);
      h2Element.querySelector(
        "span"
      ).style.cssText = `color: rgb(22, 22, 22); font-family: "Noto Serif", serif;
      font-style: normal; font-variant-ligatures: normal; 
      font-variant-caps: normal; font-weight: 400; 
      letter-spacing: normal; orphans: 2; text-align: left;
      text-indent: 0px; text-transform: none; white-space: normal;
      widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;
      background-color: rgb(255, 255, 255); text-decoration-thickness: initial; 
      text-decoration-style: initial; text-decoration-color: initial;
      float: none; display: inline !important; font-size: 17px;`;
      console.log(h2Element.outerHTML);
      seth2State(h2Element.outerHTML);
    } catch (error) {}
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const openCreatePostsModal = React.useCallback(() => {
    dispatch(showModalEdit());
  }, [dispatch]);

  const openDialog = React.useCallback(() => {
    dispatch(showDialog());
  }, [dispatch]);

  const handleOnclick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItem = (index, id) => {
    console.log(options[index] === "Xóa", id);
    localStorage.setItem("postId", JSON.stringify(id));
    if (options[index] === "Xóa") {
      openDialog();
    }
    if (options[index] === "Chỉnh sửa") {
      openCreatePostsModal();
    }
  };
  console.log(["index"], index);
  localStorage.setItem("postIndex", JSON.stringify(index));
  var status = "";
  var color = "";
  if (!post.isChecked && !post.canceled) {
    status = "Đang chờ duyệt";
    color = "yellow";
  }
  if (post.isChecked && !post.canceled) {
    status = "Đã duyệt";
    color = "green";
  }
  if (post.canceled) {
    status = "Không được duyệt";
    color = "red";
  }

  const { isShowDialog } = useSelector(showDialogState$);
  return (
    <Card>
      {isShowDialog && <AlertDialog />}
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          backgroundColor: `${color}`,
        }}
      >
        &nbsp;{status}
      </div>
      <CardHeader
        avatar={<Avatar src="" />}
        title={post.author.fullname}
        subheader={moment(post.updatedAt).format("YYYY-MM-DD HH:mm")}
        action={
          <IconButton onClick={handleOnclick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            onClick={() => handleClickItem(index, post._id)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      <CardMedia
        image={post.attachment}
        title={post.title}
        className={classes.media}
      />
      <CardContent>
        <Typography variant="h5" color="textPrimary">
          {post.title}
        </Typography>
        {console.log(post.content.length)}
        <Typography
          style={{ wordWrap: "break-word" }}
          variant="body2"
          component="p"
          color="textSecondary"
          dangerouslySetInnerHTML={{
            __html: `${h2state}`,
          }}
        ></Typography>
      </CardContent>
      <div style={{ float: "right", backgroundColor: "lightblue" }}>
        {post["name_topic"].name_topic}
      </div>
    </Card>
  );
}
