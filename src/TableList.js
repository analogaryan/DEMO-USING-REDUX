import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDemo, retrieveDemo } from "./action/crudDemo";
import { Button, message, Modal } from "antd";
import DrawerView from "./components/Drawer";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import "./table.css";
import { FaArrowUp, FaPlus, FaTrash } from "react-icons/fa";
const TableList = () => {
  useEffect(() => {
    dispatch(retrieveDemo());
  }, []);
  const tableDatas = useSelector((state) => state.crudReducer);

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(tableDatas);
  }, [tableDatas]);
  const [viewData, setViewData] = useState([]);

  const [showDrawer, setShowDrawer] = useState(false);
  const [toggleModel, setToggleModel] = useState(false);

  const [editionModal, setEditionModal] = useState({
    booleanVal: false,
    Pid: "",
  });
  const dragItem = useRef();
  const dragOverItem = useRef();

  const truncateValue = (string, newString) => {
    return string?.length > newString
      ? string.substr(0, newString - 1) + "..."
      : string;
  };
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
  const allowDrop = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    const copyListItems = [...tableData];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTableData(copyListItems);
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const removeData = (id) => {
    setLoading(true);
    setLoadingId(id)
    dispatch(deleteDemo(id))
      .then(() => {
        setLoading(false);

        message.success("Post deleted successfully!");
      })
      .catch((e) => {
        message.error("internal server error!!!");
      });
  };

  return (
    <>
      <DrawerView
        setShowDrawer={setShowDrawer}
        showDrawer={showDrawer}
        viewData={viewData}
      />
      <Modal
        modalProps={{ destroyOnClose: true }}
        title="Create"
        onOk={() => setToggleModel(false)}
        onCancel={() => setToggleModel(false)}
        open={toggleModel}
        footer={null}
      >
        <CreateForm setToggleModel={setToggleModel} />
      </Modal>
      <Modal
        title="Update"
        open={editionModal.booleanVal}
        onOk={() => setEditionModal(false)}
        onCancel={() => setEditionModal(false)}
        footer={null}
      >
        <UpdateForm id={editionModal.Pid} setEditionModal={setEditionModal} />
      </Modal>
      <div>
        <Button
          style={{ left: "37%", margin: "10px" }}
          onClick={() => setToggleModel(true)}
          type="primary"
        >
          <FaPlus style={{ marginBottom: "4px", marginRight: "2px" }} /> New
        </Button>
        <table id="table_design">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item, index) => {
              return (
                <tr
                  key={index}
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragOver={(e) => allowDrop(e)}
                  onDragEnd={drop}
                  draggable
                >
                  <td>{item.id}</td>
                  <td>
                    <a
                      style={{ color: "rgb(29 125 241)", cursor: "pointer" }}
                      onClick={() => {
                        setViewData(item);
                        setShowDrawer(true);
                      }}
                    >
                      {truncateValue(item.title, 30)}
                    </a>
                  </td>
                  <td>{truncateValue(item.body, 30)}</td>
                  <td>
                    <Button
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        setEditionModal({
                          booleanVal: true,
                          Pid: item.id,
                        });
                      }}
                    >
                      <FaArrowUp
                        style={{ marginBottom: "4px", marginRight: "2px" }}
                      />{" "}
                      Update
                    </Button>
                    {loading && loadingId === item.id ? (
                      <Button
                      style={{ marginLeft: "10px" }}
                      danger={true}
                     
                    >
                      Loading..
                      </Button>
                    ) : (
                      <Button
                        style={{ marginLeft: "10px" }}
                        danger={true}
                        onClick={() => removeData(item.id)}
                      >
                        <FaTrash
                          style={{ marginBottom: "4px", marginRight: "2px" }}
                        />
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableList;
