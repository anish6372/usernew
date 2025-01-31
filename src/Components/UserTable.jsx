import React, { useState } from "react";

export default function UserTable({ users, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  if (!Array.isArray(users)) {
    return <p>Error: Users data is not an array.</p>;
  }

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentUsers.map((user) => {
          const [firstname, lastname] = user.name
            ? user.name.split(" ")
            : ["", ""];

          return (
            <div key={user.id} className="bg-gray-800 shadow-lg rounded-lg p-6 text-white border border-gray-700">
              <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                {firstname?.[0] || ""}{lastname?.[0] || ""}
              </div>

              <div className="mt-4 text-center">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <strong>Firstname:</strong>
                    <p>{firstname || "N/A"}</p>
                  </div>
                  <div>
                    <strong>Lastname:</strong>
                    <p>{lastname || "N/A"}</p>
                  </div>
                </div>
                <p className="text-sm mt-2"><strong>ID:</strong> {user.id}</p>
                <p className="text-sm"><strong>Email:</strong> {user.email}</p>
                <p className="text-sm"><strong>Department:</strong> {user.company?.name || "N/A"}</p>
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  ✏ Edit
                </button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                  🗑 Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          ⬅ Previous
        </button>
        <span className="text-white px-4 py-2">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
