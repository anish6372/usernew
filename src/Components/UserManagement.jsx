import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import UserForm from "./UserForm";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    company: { name: "" },
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setUsers(response.data))
      .catch(() => alert("Error fetching users"));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch(() => alert("Error deleting user"));
  };

  const handleSubmit = (formData) => {
    if (isEditing) {
      const updatedUser = {
        id: formData.id,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        company: formData.company,
        name: `${formData.firstname} ${formData.lastname}`,
      };

      setUsers(
        users.map((user) => (user.id === formData.id ? updatedUser : user))
      );

      setIsEditing(false);
      setFormData({
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        company: { name: "" },
      });
    } else {
      const newUser = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        company: formData.company,
        name: `${formData.firstname} ${formData.lastname}`,
      };

      const newUserWithId = { ...newUser, id: users.length + 1 };

      setUsers([...users, newUserWithId]);

      setFormData({
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        company: { name: "" },
      });
    }
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      firstname: user.name.split(" ")[0],
      lastname: user.name.split(" ")[1] || "",
      email: user.email,
      company: { name: user.company.name },
    });
    setToggle(!toggle);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto text-white">
          <h1 className="text-xl font-semibold">User Management</h1>
          <div className="space-x-6">
            <a href="#users" className="hover:text-gray-200 transition-all">Users</a>
            
          </div>
        </div>
      </nav>

      <div className="p-6">
        
        <UserForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          togg={toggle}
          setTogg={setToggle}
        />
        <UserTable
          users={users}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
