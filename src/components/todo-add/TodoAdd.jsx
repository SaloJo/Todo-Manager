import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker, Input } from "antd";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../ui/Card";
import classes from "./TodoAdd.module.css";
import TodoSelect from "../../utils/select/TodoSelect";
import { todoActions } from "../../store/todo";

const TodoAdd = () => {
  const [todoName, setTodoName] = useState("");
  const [todoDate, setDate] = useState("");
  const [category, setCategory] = useState("Default");
  const categories = useSelector((state) => state.todo.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const todos = useSelector((state) => state.todo.todos);

  useEffect(() => {
    if (params.todoId) {
      const todoItem = todos.find((todoItem) => todoItem.id === params.todoId);
      if (todoItem) {
        setTodoName(todoItem.task);
        setCategory(todoItem.category);
      }
    }
  }, []);

  const submitFormHandler = (event) => {
    event.preventDefault();
    let dateString = moment(new Date()).utc().format("DD-MMM-YYYY");
    let diff;
    let status = "Due";
    if (todoDate) {
      const datePickerString = moment(todoDate).utc().format("DD-MMM-YYYY");
      diff = new Date(datePickerString) - new Date(dateString);
      dateString = datePickerString;
    } else {
      diff = -1;
    }

    if(diff >= 0){
      status = "Due";
    }else{
      status = "Overdue"
    }

    if(!todoDate && params.todoId){
      const todoItem = todos.find((todoItem) => todoItem.id == params.todoId);
      if (todoItem) {
        dateString = todoItem.date;
        status = todoItem.status;
      }
    }

    const data = {
      id: params.todoId ? params.todoId : Math.random(),
      task: todoName,
      date: dateString,
      category: category,
      status:  status,
    };

    if(params.todoId){
      dispatch(todoActions.updateTask(data));
    }else {
      dispatch(todoActions.addTask(data));
    }

    navigate("/todo-list");
  };

  const onChangeCategory = (value) => {
    setCategory(value);
  };
  const onChangeDate = (value) => {
    setDate(value);
  };

  return (
    <div className="container todo-add-container">
      <Card>
        <span className="px-4 h3">
          {params.todoId ? "Update Task" : "Add New Task"}
        </span>

        <form
          className={classes.form}
          onSubmit={submitFormHandler}
          style={{ padding: "50px" }}
        >
          <div className={classes.control}>
            <label htmlFor="todo-name">What is to be done?</label>
            <Input
              className={classes.formControlWidth}
              type="text"
              placeholder="Enter Task Here"
              id="todo-name"
              required
              autoComplete="off"
              onChange={(e) => setTodoName(e.target.value)}
              value={todoName}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Due date</label>
            <DatePicker
              className={classes.formControlWidth}
              onChange={onChangeDate}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="text">Add to List</label>
            <TodoSelect
              width={"80%"}
              onChange={onChangeCategory}
              options={categories}
              value={category}
            />
          </div>
          <div className={classes.actions}>
            <button type="submit" className="btn btn-primary">
              {params.todoId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TodoAdd;
