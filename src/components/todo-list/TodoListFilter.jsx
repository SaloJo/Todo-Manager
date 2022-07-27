import { useRef } from "react";
import { useSelector } from "react-redux";
import TodoSelect from "../../utils/select/TodoSelect";

const statusOptions = ["Due", "Done", "Overdue"];

function TodoListFilter({
  onStatusChange,
  onCategoryChange,
  onChangeSearch,
  status,
  category,
  search,
}) {
  let categories = useSelector((state) => state.todo.categories);

  return (
    <div className="container filter-bar">
      <div className="row p-3">
        <div className="col-md-4 ">
          <span className="fs-5 pe-2">Status</span>
          <TodoSelect
            width="60%"
            onChange={onStatusChange}
            options={statusOptions}
            value={status}
          />
        </div>
        <div className="col-md-4">
          <span className="fs-5 pe-2">Category</span>
          <TodoSelect
            width="60%"
            onChange={onCategoryChange}
            options={categories}
            value={category}
          />
        </div>
        <div className="col-md-4" style={{ display: "flex" }}>
          <form className="d-flex input-group w-auto my-auto mb-3 mb-md-0">
            <input
              autoComplete="off"
              type="search"
              className="form-control rounded search-box"
              style={{ height: "35px" }}
              placeholder="Search"
              onChange={(e) => onChangeSearch(e.target.value)}
              value={search}
            />
            <span className="input-group-text border-0 d-none d-lg-flex search-icon">
              <i className="fa fa-search"></i>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TodoListFilter;
