import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./updateUser.css";
import axios from "axios";
import toast from "react-hot-toast";

function UpdateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/api/update/user/${id}`,
        user
      );
      toast.success(res.data.message, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="updateUserPage">
      <div className="updateUserCard">
        <Link to="/" className="backBtn">
          ← Back
        </Link>

        <h2>Update User</h2>

        <form onSubmit={onFormSubmit}>
          <div className="inputGroup">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={user.name}
              onChange={inputHandler}
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
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
