import React from "react";
import { Grid } from "@material-ui/core";
import Post from "./Posts/index";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions/saga/posts";
import { Pagination } from "@material-ui/lab";

import { postsState$, userState$ } from "../../../../redux/selector/index";
import { modalEditState$ } from "../../../../redux/selector/index";
import EditPost from "./Posts/EditPost/index";
import usePagination from "../../../Pagination/index";

export default function PostsList() {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector(userState$);
  const posts = useSelector(postsState$);

  console.log(["PostsList - posts"], posts);

  React.useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest(currentUser.id));
  }, [dispatch, currentUser]);

  const { isShowEdit } = useSelector(modalEditState$);
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
    <div>
      {isShowEdit === false ? (
        <div>
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
        </div>
      ) : (
        <EditPost post={posts[postIndex]} />
      )}
    </div>
  );
}
