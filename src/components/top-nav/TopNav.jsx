import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

function TopNav() {
  const dispatch = useDispatch();

  const logout = (e) => {
    dispatch(authActions.logout());
  };
  return (
    <div className="p-3 text-center bg-transparent border-bottom top-nav">
      <div className="container nav-container">
        <div className="nav-row">
          <div>
            <a href="#!">
              <img
                alt=""
                src={require("../../assets/images/Logo.png")}
                className="logo-img"
              />
            </a>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
