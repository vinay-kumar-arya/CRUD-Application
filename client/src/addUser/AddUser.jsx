import React, { useState } from "react";
import "./addUser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function AddUser() {
  const initialUser = {
    name: "",
    email: "",
    address: "",
  };
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/user", user);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add user");
    }
  };

  return (
    <div className="addUserPage">
      <div className="addUserCard">
        <Link to="/" className="backBtn">
          ← Back
        </Link>

        <h2>Add New User</h2>

        <form onSubmit={onFormSubmit}>
          <div className="inputGroup">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={user.name}
              onChange={inputHandler}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={inputHandler}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={user.address}
              onChange={inputHandler}
            />
          </div>

          <button type="submit" className="submitBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
