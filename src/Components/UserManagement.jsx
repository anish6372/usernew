import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import UserForm from "./UserForm";

const API_URL = "https://reqres.in/api/users";

export default function UserManagement({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [formData, setFormData] = useState({
    id: null,
    firstname: "",
    lastname: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setUsers(response.data.data)) 
      .catch(() => alert("Error fetching users"));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch(() => alert("Error deleting user"));
  };

  const handleSubmit = (data) => {
    if (isEditing) {
      axios
        .put(`${API_URL}/${data.id}`, {
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
        })
        .then((response) => {
          const updatedUser = {
            id: data.id,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
          };

          setUsers(users.map((user) => (user.id === data.id ? updatedUser : user)));
          setIsEditing(false);
        })
        .catch(() => alert("Error updating user"));
    } else {
      axios
        .post(API_URL, {
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
        })
        .then((response) => {
          const newUser = {
            id: response.data.id,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
          };

          setUsers([...users, newUser]);
        })
        .catch(() => alert("Error adding user"));
    }

    setFormData({
      id: null,
      firstname: "",
      lastname: "",
      email: "",
    });
    setToggle(false);
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      firstname: user.first_name,
      lastname: user.last_name,
      email: user.email,
    });
    setToggle(true);
    setIsEditing(true);
  };

  
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto text-white">
          <h1 className="text-xl font-semibold">User Management</h1>
          <button
            onClick={onLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-6">
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <UserForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          togg={toggle}
          setTogg={setToggle}
        />
        <UserTable
          users={filteredUsers}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
