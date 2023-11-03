import React, { useState, useRef } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./HomeRedirectPage.css"
// import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

function HomeRedirectPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    history.push("/");
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
    history.push("/");
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "50vh", // 100% of the viewport height
        width: "50vw",
        borderRadius: "15px",
        marginTop: "100px",
      }}
    >
      <h1>Log in to Flexy</h1>
      <form
        className="home-page-form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label style={{ marginBottom: "10px" }}>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label style={{ marginBottom: "10px" }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <button
            type="submit"
            style={{ marginBottom: "20px", marginRight: "20px", color: "white" }}
          >
            Log In
          </button>

          <OpenModalButton
            buttonText="Sign up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal/>}
          />

          <button className="demo-button" type="button" onClick={handleDemoLogin} style={{ marginBottom: "20px", marginRight: "20px", color: "white" }}>Demo User</button>

        </div>
      </form>
    </div>
  );
}

export default HomeRedirectPage;
