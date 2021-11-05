import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { childTopic$ } from "../../../../../redux/selector/index";
import {
  retrieveChildTopicAuthor,
  findByNameChildTopic,
  deleteAllChildtopic,
} from "../../../../../redux/actions/thunk/childTopic";
import { Link, Router } from "react-router-dom";
import { history } from "../../../../../helpers/history";
import { userState$ } from "../../../../../redux/selector/index";
import ChildService from "../../../../../services/childTopic.service";
import { Pagination } from "@material-ui/lab";

export default function ListTopic() {
  const [currnentChildTopic, setCurrentChildTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");
  const { user: currentUser } = useSelector(userState$);

  const topic = useSelector(childTopic$);
  const [childTopic, setChildTopic] = useState(topic);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  console.log(childTopic);
  React.useEffect(() => {
    dispatch(retrieveChildTopicAuthor(currentUser.id));
  }, []);

  const onChangeSearchName = (e) => {
    const SearchName = e.target.value;
    setSearchName(SearchName);
  };

  const refreshData = () => {
    setCurrentChildTopic(null);
    setCurrentIndex(-1);
  };

  const setActiveChildTopic = (child, index) => {
    setCurrentChildTopic(child);
    setCurrentIndex(index);
    // console.log(['lllll'],currnentChildTopic);
  };

  // const removeAllChildtopic = () => {
  //   dispatch(deleteAllChildtopic())
  //     .then((response) => {
  //       console.log(response);
  //       refreshData();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const getRequestParams = (searchName, page, pageSize) => {
    let params = {};

    if (searchName) {
      params["name_topic_child"] = searchName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const findRetrieveAllChildTopic = () => {
    const params = getRequestParams(searchName, page, pageSize);

    ChildService.findByName(params)
      .then((response) => {
        const { childTopic, totalPages } = response.data;

        setChildTopic(childTopic);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(findRetrieveAllChildTopic, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  // const findByName = () => {
  //   refreshData();
  //   dispatch(findByNameChildTopic(searchName));
  // };

  return (
    <Router history={history}>
      &nbsp;
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tên"
              value={searchName}
              onChange={onChangeSearchName}
            />

            <div className="input-group-append">
              <a
                onClick={findRetrieveAllChildTopic}
                className="btn btn-outline-secondary"
                href="#"
                role="button"
              >
                Tìm kiếm{" "}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-3">
              {"Số thẻ chủ đề mỗi trang: "}
              <select onChange={handlePageSizeChange} value={pageSize}>
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <Pagination
                className="my-3"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                color="primary"
                onChange={handlePageChange}
              />
            </div>

        <div className="col-md-6">
          <h4>Danh sách chủ đề</h4>
          <ul className="list-group">
            {childTopic &&
              childTopic.map((child, index) => (
                <li
                  className={
                    "list-group-item" +
                    (index === currentIndex ? " active" : "")
                  }
                  onClick={() => setActiveChildTopic(child, index)}
                  key={index}
                >
                  {child.name_topic_child}
                </li>
              ))}
            &nbsp;
          </ul>
          {/* <a
            onClick={removeAllChildtopic}
            className="btn btn-danger btn-sm "
            href="#"
            role="button"
          >
            Xoá tất cả{" "}
          </a> */}
        </div>

        <div className="col-md-6">
          {currnentChildTopic ? (
            <div>
              <h4>Chủ đề</h4>
              <div>
                <label>
                  <strong>Tên :</strong>
                </label>
                {currnentChildTopic.name_topic_child}
              </div>
              <Link
                to={"/author/topic/childTopic/" + currnentChildTopic._id}
                className="bage bage-warning"
              >
                Chỉnh sửa
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Xin nhấn vào một chủ đề</p>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}
