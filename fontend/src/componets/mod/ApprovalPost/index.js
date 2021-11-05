import React from "react";
import { Grid, Container } from "@material-ui/core";
import Post from "./Posts/index";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/saga/posts";
import AlertDialog from "./Posts/Preview/index";
import {
  postsState$,
  showDialogState$,
  sendMailPopup$,
} from "../../../redux/selector/index";
import { showDialog } from "../../../redux/actions/saga/posts";
import Popup from "./Posts/PopupCustom/index";
import usePagination from "../../Pagination/index";
import { Pagination } from "@material-ui/lab";

export default function PostsList() {
  const dispatch = useDispatch();
  const { isShowDialog } = useSelector(showDialogState$);
  const { isShowPopup } = useSelector(sendMailPopup$);

  const posts = useSelector(postsState$);

  console.log(["PostsList - posts"], posts);

  React.useEffect(() => {
    dispatch(actions.getPostsAll.getPostsARequest());
  }, [dispatch]);
  const postIndex = JSON.parse(localStorage.getItem("postIndex"));

  const [page, setPage] = React.useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(posts.length / PER_PAGE);
  const _DATA = usePagination(posts, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Container maxWidth={false} className="container">
      &nbsp;
      <Pagination
        className
        color="primary"
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
      &nbsp;
      <Grid container spacing={2} alignItems="stretch">
        {_DATA.currentData().map((post, index) => (
          <Grid key={post._id} item xs={12} sm={4}>
            <Post index={index} post={post} />
          </Grid>
        ))}
      </Grid>
      &nbsp;
      <Pagination
        className
        color="primary"
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
      &nbsp;
      {isShowDialog && <AlertDialog preview={posts[postIndex]} />}
      {isShowPopup && <Popup post={posts[postIndex]} />}
    </Container>
  );
}
