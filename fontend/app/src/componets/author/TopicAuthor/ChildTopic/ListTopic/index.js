import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { childTopic$ } from "../../../../../redux/selector/index";
import {
  retrieveChildTopic,
  findByNameChildTopic,
  deleteAllChildtopic,
} from "../../../../../redux/actions/thunk/childTopic";
import { Link, Router } from "react-router-dom";
import { history } from "../../../../../helpers/history";
export default function ListTopic() {
  const [currnentChildTopic, setCurrentChildTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const childTopic = useSelector(childTopic$);
  const dispatch = useDispatch();

  console.log(childTopic);
  React.useEffect(() => {
    dispatch(retrieveChildTopic());
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

  const removeAllChildtopic = () => {
    dispatch(deleteAllChildtopic())
      .then((response) => {
        console.log(response);
        refreshData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findByName = () => {
    refreshData();
    dispatch(findByNameChildTopic(searchName));
  };

  return (
    <Router history={history}>
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
                onClick={findByName}
                className="btn btn-outline-secondary"
                href="#"
                role="button"
              >
                Tìm kiếm{" "}
              </a>
            </div>
          </div>
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
          <a
            onClick={removeAllChildtopic}
            className="btn btn-danger btn-sm "
            href="#"
            role="button"
          >
            Xoá tất cả{" "}
          </a>
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
