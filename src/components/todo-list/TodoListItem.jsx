import { Modal } from "antd";
import { useRef, useState } from "react";
import { todoActions } from "../../store/todo";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function TodoListItem({ todoItem }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const idRef = useRef("");
  const navigate = useNavigate("");

  const onDelete = (id) => {
    idRef.current = id;
    setShowConfirm(true);
  };
  const hideModal = () => {
    setShowConfirm(false);
  };
  const onOk = () => {
    dispatch(todoActions.deleteTask(idRef.current));
    hideModal();
  };

  let color = "rgba(0, 0, 0, 0.5)";
  if (todoItem.status === "Done") {
    color = "green";
  } else if (todoItem.status === "Overdue") {
    color = "red";
  }

  return (
    <div
      style={{ cursor: "auto" }}
      className="todolist-item d-style btn btn-brc-tp border-2 bgc-transparent btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm"
    >
      <div className="row align-items-center">
        <div className="col-12 col-md-2">
          <span
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(todoActions.completeTask(todoItem.id));
            }}
          >
            <img
              className="incomplete-check"
              alt=""
              src={require("../../assets/images/incomplete.png")}
            />
            {todoItem.status === "Done" && (
              <i className="fa fa-check done-icon" aria-hidden="true"></i>
            )}
          </span>
        </div>

        <div className="col-12 col-md-6">
          <h4 className="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
            {todoItem.task}
          </h4>

          <div className="d-flex flex-row mt-1 text-black-50 date-time justify-content-center">
            <div style={{ color: color }}>
              <span className="me-2" >
                {todoItem.status}
              </span>
              <br />
              <span className="me-2" >
                Task Date :
              </span>
              
              <i className="fa fa-calendar-o"></i>
              <span className="mx-2">{todoItem.date}</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 text-center">
          <div className="row justify-content-center">
            <span
              style={{ cursor: "pointer" }}
              className="fa-stack"
              onClick={() => navigate("/todo-add/" + todoItem.id)}
            >
              <i className="fa fa-square fa-stack-2x"></i>{" "}
              <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>{" "}
            </span>
            <span
              style={{ cursor: "pointer" }}
              className="fa-stack delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todoItem.id);
              }}
            >
              <i className="fa fa-square fa-stack-2x"></i>{" "}
              <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>{" "}
            </span>
          </div>
        </div>
      </div>
      <Modal
        title="Delete Task"
        visible={showConfirm}
        onOk={onOk}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete task?</p>
      </Modal>
    </div>
  );
}

export default TodoListItem;
