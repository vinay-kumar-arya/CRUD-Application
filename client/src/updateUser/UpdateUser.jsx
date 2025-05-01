import React, { use, useEffect, useState } from "react";
import { Link, useNavigate , useParams} from "react-router-dom";
import "./updateUser.css"
import axios from "axios";
import toast from "react-hot-toast";

function UpdateUser() {
  const users = {
    name: "",
    email: "",
    address: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const {id} = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/user/${id}`)
    .then((response)=>{
      setUser(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[id])

  const onFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/user/${id}`, user)
      .then((response) => {
        // console.log("User registration successful.");
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="updateUser">
        <Link to={"/"} type="button" className="btn btn-secondary">
          <i className="fa-solid fa-backward"></i> Back
        </Link>
        <h3>Update User</h3>
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
              value={user.name}
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
              value={user.email}
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
              value={user.address}
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

export default UpdateUser;
