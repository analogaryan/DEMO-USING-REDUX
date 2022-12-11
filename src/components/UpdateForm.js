import React, { useEffect, useState } from "react";
import { message } from "antd";
import CRUDService from "../services/crudServices";
import { useDispatch } from "react-redux";
import { updateDemo } from "../action/crudDemo";

const UpdateForm = (props) => {
  const initialDataState = {
    id: null,
    title: "",
    body: "",
  };
  const [currentData, setCurrentData] = useState(initialDataState);
  const [loading, setLoading] = useState(false);

  console.log(currentData, "currentData");
  const dispatch = useDispatch();

  const getTutorial = (id) => {
    setCurrentData(initialDataState);
    CRUDService.get(id)
      .then((response) => {
        setCurrentData(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        message.error("internal server error!!!");
      });
  };

  useEffect(() => {
    getTutorial(props.id);
  }, [props.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentData({ ...currentData, [name]: value });
  };

  const onUpdateDemo = () => {
    setLoading(true);
    const data = {
      id: currentData.id,
      title: currentData.title,
      body: currentData.body,
    };

    dispatch(updateDemo(currentData.id, data))
      .then((response) => {
        console.log(response);
        props.setEditionModal(false);
        setCurrentData({ ...currentData });
        setLoading(false);
        setCurrentData(initialDataState);

        message.success("The post was updated successfully!");
      })
      .catch((e) => {
        message.error("internal server error!!!");
      });
  };
  return (
    <div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          required
          value={currentData.title}
          onChange={handleInputChange}
          name="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="body">Description</label>
        <input
          type="text"
          className="form-control"
          id="body"
          required
          value={currentData.body}
          onChange={handleInputChange}
          name="body"
        />
      </div>

      {loading ? (
        <button className="btn btn-success">loading...</button>
      ) : (
        <button onClick={onUpdateDemo} className="btn btn-success">
          Update post
        </button>
      )}
    </div>
  );
};
export default UpdateForm;
