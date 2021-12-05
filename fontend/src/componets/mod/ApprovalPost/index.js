import React, { useState, useEffect } from "react";
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
import api from "../../../services/posts.service";

export default function PostsList() {
  const dispatch = useDispatch();
  const { isShowDialog } = useSelector(showDialogState$);
  const { isShowPopup } = useSelector(sendMailPopup$);

  // const posts = useSelector(postsState$);

  // console.log(["PostsList - posts"], posts);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const pageSizes = [3, 6, 9];
  const [posts, setPosts] = useState([]);

  // React.useEffect(() => {
  //   dispatch(actions.getPostsAll.getPostsARequest());
  // }, [dispatch]);
  const postIndex = JSON.parse(localStorage.getItem("postIndex"));

  // const [page, setPage] = React.useState(1);
  // const PER_PAGE = 10;

  // const count = Math.ceil(posts.length / PER_PAGE);
  // const _DATA = usePagination(posts, PER_PAGE);

  // const handleChange = (e, p) => {
  //   setPage(p);
  //   _DATA.jump(p);
  // };
  const getRequestParams = (page, pageSize) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrievePosts = async () => {
    const params = getRequestParams(page, pageSize);

    await api.getPostsAll(params).then((data) => {
      console.log(["llll"], data);
      const { posts, totalPages } = data.data;
      setPosts(posts);
      setCount(totalPages);
    }); //excute function
  };

  useEffect(retrievePosts, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  return (
    <Container maxWidth={false} className="container">
      &nbsp;
      {/* <Pagination
        className
        color="primary"
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      /> */}
      <div className="mt-3">
        {"Số bài đăng mỗi trang: "}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <Pagination
        className="my-3"
        count={count}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
      &nbsp;
      <Grid container spacing={2} alignItems="stretch">
        {posts.map((post, index) => (
          <Grid key={post._id} item xs={12} sm={4}>
            <Post index={index} post={post} />
          </Grid>
        ))}
      </Grid>
      &nbsp;
      {/* <Pagination
        className
        color="primary"
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      /> */}
      <Pagination
        className="my-3"
        count={count}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
      &nbsp;
      {isShowDialog && <AlertDialog preview={posts[postIndex]} />}
      {isShowPopup && <Popup post={posts[postIndex]} />}
    </Container>
  );
}
