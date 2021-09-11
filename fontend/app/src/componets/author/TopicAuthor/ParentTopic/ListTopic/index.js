import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parentTopic$ } from "../../../../../redux/selector/index";
import {
  retrieveParentTopic,
  findByNameParentTopic,
  deleteAllParenttopic,
} from "../../../../../redux/actions/thunk/parentTopic";
import { Link } from "react-router-dom";

export default function ListTopic() {
  const [currnentParentTopic, setCurrentParentTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const parentTopic = useSelector(parentTopic$);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(retrieveParentTopic());
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
    
  };

  const refreshData = () => {
    setCurrentParentTopic(null);
    setCurrentIndex(-1);
  };

  const setActiveParentTopic = (parent, index) => {
    setCurrentParentTopic(parent);
    setCurrentIndex(index);
  };

  const removeAllParenttopic = () => {
    dispatch(deleteAllParenttopic())
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
    dispatch(findByNameParentTopic(searchName));
  };

  return (
    
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
          {parentTopic &&
            parentTopic.map((parent, index) => {
              <li
                className={
                  "list-group-item" + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveParentTopic(parent, index)}
                key={index}
              >
                {parent.name}
              </li>;
            })}
        </ul>

        <a
          onClick={removeAllParenttopic}
          className="btn btn-danger btn-sm "
          href="#"
          role="button"
        >
          Xoá tất cả{" "}
        </a>
      </div>

      <div className="col-md-6">
        {currnentParentTopic ? (
          <div>
            <h4>Chủ đề</h4>
            <div>
              <label htmlFor="name_topic_parent">
                <strong>Tên :</strong>
              </label>
              {currnentParentTopic.name_topic_child}
            </div>
            <div>
              <label htmlFor="name_topic_child">Chủ đề con:</label>
              {currnentParentTopic.name_topic_parent}
            </div>
            {currnentParentTopic.approved === "true" &&
              currnentParentTopic.canceled === "true" && (
                <div>
                  <label htmlFor="approved">Trạng thái:</label>
                  Đã duyệt
                </div>
              )}
            {currnentParentTopic.approved === "false" &&
              currnentParentTopic.canceled === "false" && (
                <div>
                  <label htmlFor="approved">Trạng thái:</label>
                  Không được duyệt
                </div>
              )}
            {currnentParentTopic.approved === "true" &&
              currnentParentTopic.canceled === "false" && (
                <div>
                  <label htmlFor="approved">Trạng thái:</label>
                  Đang chờ duyệt
                </div>
              )}
            <Link
              to={"/author/topic/listParentTopic/" + currnentParentTopic.id}
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
  );
}
