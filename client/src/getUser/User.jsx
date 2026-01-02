import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await axios.get(
          "https://crud-application-7vj1.onrender.com/api/users"
        );
        setUsers(getData.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `https://crud-application-7vj1.onrender.com/api/delete/user/${userId}`
      );
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="userPage">
      <div className="userCard">
        <div className="userHeader">
          <h2>Users</h2>
          <Link to="/add" className="addBtn">
            + Add User
          </Link>
        </div>

        {users.length === 0 ? (
          <div className="noData">
            <h3>No users found</h3>
            <p>Please add a new user</p>
          </div>
        ) : (
          <div className="tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td data-label="S.No">{index + 1}</td>
                    <td data-label="Name">{user.name}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Address">{user.address}</td>
                    <td data-label="Action" className="actions">
                      <Link to={`/update/${user._id}`} className="editBtn">
                        ✏️
                      </Link>
                      <button
                        className="deleteBtn"
                        onClick={() => deleteUser(user._id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
