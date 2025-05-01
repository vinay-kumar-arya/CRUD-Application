import React, { useState } from "react";
import "./addUser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function AddUser() {
  const users = {
    name: "",
    email: "",
    address: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:8000/api/user`, user)
      .then((response) => {
        // console.log("User registration successful.");
        toast.success(response.data.message, {position:'top-right'});
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="addUser">
        <Link to={"/"} type="button" className="btn btn-secondary">
          <i className="fa-solid fa-backward"></i> Back
        </Link>
        <h3>Add New User</h3>
        <form className="addUserForm" onSubmit={onFormSubmit}>
          <div className="inputGroup">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="Enter your name"
              onChange={inputHandler}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your email"
              onChange={inputHandler}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              autoComplete="off"
              placeholder="Enter your address"
              onChange={inputHandler}
            />
          </div>
          <div className="inputGroup">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUser;
