import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parentTopic$ } from "../../../../../redux/selector/index";
import {
  retrieveParentTopicAuthor,
  findByNameParentTopic,
  deleteAllParenttopic,
} from "../../../../../redux/actions/thunk/parentTopic";
import { Link, Router } from "react-router-dom";
import { history } from "../../../../../helpers/history";
import ParentTopicDataService from "../../../../../services/parentTopic.service";
import { userState$ } from "../../../../../redux/selector/index";
import { Pagination } from "@material-ui/lab";

export default function ListTopic() {
  const [currnentParentTopic, setCurrentParentTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");
  const { user: currentUser } = useSelector(userState$);
  const topic = useSelector(parentTopic$);
  const [parentTopic, setParentTopic] = useState(topic.parentTopic);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];
  // console.log(parentTopic);
  React.useEffect(() => {
    dispatch(retrieveParentTopicAuthor(currentUser.id));
  }, []);

  const onChangeSearchName = (e) => {
    const SearchName = e.target.value;
    setSearchName(SearchName);
  };

  const refreshData = () => {
    setCurrentParentTopic(null);
    setCurrentIndex(-1);
  };

  const setActiveParentTopic = (parent, index) => {
    setCurrentParentTopic(parent);
    setCurrentIndex(index);
    getParentTopic(parent._id);
    // console.log(['lllll'],currnentParentTopic);
  };

  const getParentTopic = async (id) => {
    // console.log(["id fggfgfgfg"], id);
    await ParentTopicDataService.get(id)
      .then((response) => {
        console.log(id, response.data);
        localStorage.setItem("name_topic", JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getRequestParams = (searchName, page, pageSize) => {
    let params = {};

    if (searchName) {
      params["name_topic"] = searchName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const findRetrieveAllParentTopic = () => {
    const params = getRequestParams(searchName, page, pageSize);

    ParentTopicDataService.findByName(params)
      .then((response) => {
        const { parentTopic, totalPages } = response.data;

        setParentTopic(parentTopic);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(findRetrieveAllParentTopic, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  // const findByName = () => {
  //   refreshData();
  //   dispatch(findByNameParentTopic(searchName));
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
                onClick={findRetrieveAllParentTopic}
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
          {"Số chủ đề mỗi trang: "}
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
            {parentTopic &&
              parentTopic.map((parent, index) => (
                <li
                  className={
                    "list-group-item" +
                    (index === currentIndex ? " active" : "")
                  }
                  onClick={() => setActiveParentTopic(parent, index)}
                  key={index}
                >
                  {parent.name_topic}
                  {"    "}
                  {!parent.isChecked && !parent.canceled && (
                    <div style={{ float: "right", backgroundColor: "yellow" }}>
                      Đang chờ duyệt
                    </div>
                  )}
                  {parent.isChecked && !parent.canceled && (
                    <div style={{ float: "right", backgroundColor: "#3E9C5B" }}>
                      Đã duyệt
                    </div>
                  )}
                  {parent.canceled && (
                    <div style={{ float: "right", backgroundColor: "red" }}>
                      Không được duyệt
                    </div>
                  )}
                </li>
              ))}
            &nbsp;
          </ul>
          {/* <a
            onClick={removeAllParenttopic}
            className="btn btn-danger btn-sm "
            href="#"
            role="button"
          >
            Xoá tất cả{" "}
          </a> */}
        </div>

        <div className="col-md-6">
          {currnentParentTopic ? (
            <div>
              <h4>Chủ đề</h4>
              <div>
                <label>
                  <strong>Tên :</strong>
                </label>
                {currnentParentTopic.name_topic}
              </div>
              <Link
                to={"/author/topic/topicParent/" + currnentParentTopic._id}
                className="bage bage-warning"
              >
                Chỉnh sửa
              </Link>

              <div>Phản hồi từ kiểm duyệt:</div>

              <div
                style={{
                  whiteSpace: "pre-line",
                  overflow: "auto",
                  maxHeight: "300px",
                }}
                class="container-sm !direction !spacing"
              >
                {currnentParentTopic.feedback}
              </div>
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
