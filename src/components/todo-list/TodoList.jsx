import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TodoListFilter from "./TodoListFilter";
import TodoListItem from "./TodoListItem";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const statusRef = useRef("All");
  const categoryRef = useRef("All");
  const searchRef = useRef("");
  const todos = useSelector((state) => state.todo.todos);
  const navigate = useNavigate();

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const statusSelectHandler = (status) => {
    statusRef.current = status;
    categoryRef.current = "All";
    searchRef.current = "";
    const newList = todos.filter((todo) => todo.status === status);
    setTodoList(newList);
  };

  const categorySelectHandler = (category) => {
    categoryRef.current = category;
    statusRef.current = "All";
    searchRef.current = "";
    const newList = todos.filter((todo) => todo.category === category);
    setTodoList(newList);
  };

  const searchHandler = (text) => {
    searchRef.current = text;
    categoryRef.current = "All";
    statusRef.current = "All";
    const newList = todos.filter(
      (todo) => todo.task.toLowerCase().search(text.toLowerCase()) !== -1
    );
    setTodoList(newList);
  };

  const statusChangeHandler = (id) => {};

  const deleteHandler = (id) => {};

  const editHandler = (id) => {};

  return (
    <div className="container todo-list-container">
      <TodoListFilter
        onStatusChange={statusSelectHandler}
        onCategoryChange={categorySelectHandler}
        onChangeSearch={searchHandler}
        status={statusRef.current}
        category={categoryRef.current}
        search={searchRef.current}
      />
      {!todos.length && (
        <div className="todo-list-item-container mt-5" style={{textAlign: "center"}}>
          <h2>No Task Found</h2>
          <button className="btn btn-outline-success" onClick={() => navigate("/todo-add")}> Add New Task</button>
        </div>
      )}
      <div className="todo-list-item-container">
        {todoList.map((todoItem) => (
          <TodoListItem key={todoItem.id} todoItem={todoItem} />
        ))}
      </div>
      {todos.length ? (
        <div
          title="add new todo"
          onClick={() => navigate("/todo-add")}
          className="add-new-todo-btn rounded-circle"
        >
          <i className="fa fa-plus"></i>
        </div>
      ): null}
    </div>
  );
}

export default TodoList;
