import React, { useState } from "react";

export default function LoginSignup({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? "http://localhost:4000/api/register" : "http://localhost:4000/api/login";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        if (!isSignup) {
          onLogin(data.token); 
        } else {
          alert("Signup successful! Please log in.");
          setIsSignup(false);
        }
      } else {
        const errorText = await response.json();
        alert("Error: " + (errorText.message || "An unknown error occurred."));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Log In"}</h2>
        {isSignup && (
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600">
          {isSignup ? "Sign Up" : "Log In"}
        </button>
        <p className="mt-4 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-400 underline"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
}