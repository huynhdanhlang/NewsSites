import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Post from "./Posts/index";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions/saga/posts";
import { Pagination } from "@material-ui/lab";
import { takeLatest, call, put } from "redux-saga/effects";
import api from "../../../../services/posts.service";
import { postsState$, userState$ } from "../../../../redux/selector/index";
import { modalEditState$ } from "../../../../redux/selector/index";
import EditPost from "./Posts/EditPost/index";
import usePagination from "../../../Pagination/index";

export default function PostsList() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const pageSizes = [3, 6, 9];
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector(userState$);

  const { isShowEdit } = useSelector(modalEditState$);
  const postIndex = JSON.parse(localStorage.getItem("postIndex"));

  const getRequestParams = (userId, page, pageSize) => {
    let params = {};

    if (userId) {
      params["author"] = userId;
    }
    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrievePosts = async () => {
    const params = getRequestParams(currentUser.id, page, pageSize);

    await api.getPosts(params).then((data) => {
      console.log(["llll"],data);
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
    <div>
      {isShowEdit === false ? (
        <div>
          &nbsp;
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
        </div>
      ) : (
        <EditPost post={posts[postIndex]} />
      )}
    </div>
  );
}
