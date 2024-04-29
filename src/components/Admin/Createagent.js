import React, { useContext, useEffect, useState } from "react";
import TicketContext from "../../contexts/TicketContext";
import { useNavigate } from "react-router-dom";

const Createagent = (props) => {
    
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("type") === "admin") {
      console.log("ok");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);


    const context = useContext(TicketContext);
    const { addUser } = context;

    const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
  });

  const clickHandler = (e) => {
    e.preventDefault();
    addUser(
      credentials.name,
      credentials.email,
      credentials.password,
      credentials.type,
    );
    setCredentials({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "",
    });
    props.showAlert("User Added", "success");
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="my-3 mx-2">
        <h2>Create User</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={3}
              required
              value={credentials.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onChange}
              required
              value={credentials.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
            Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              minLength={5}
              required
              value={credentials.password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              onChange={onChange}
              minLength={5}
              required
              value={credentials.confirmPassword}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              User Type
            </label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={credentials.type}
              onChange={onChange}
              required
            >
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary "
            onClick={clickHandler}
            disabled={
              credentials.name.Length < 3 ||
              credentials.password.Length < 5 ||
              credentials.confirmPassword.length < 5
            }
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createagent;
