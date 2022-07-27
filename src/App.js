import "./App.css";
import Login from "./components/login/Login";
import TodoList from "./components/todo-list/TodoList";
import { useSelector } from "react-redux";
import TopNav from "./components/top-nav/TopNav";
import TodoAdd from "./components/todo-add/TodoAdd";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Login />;
  }

  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<Navigate to="/todo-list" />} exact />
        <Route path="/todo-list" element={<TodoList />} />
        <Route path="/todo-add" element={<TodoAdd />} />
        <Route path="/todo-add/:todoId" element={<TodoAdd />} />
      </Routes>
    </>
  );
}

export default App;
