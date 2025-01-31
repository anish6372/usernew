import React, { useState, useEffect } from "react";

export default function UserForm({ formData, setFormData, handleSubmit, isEditing, togg, setTogg }) {

    const handleToggle = () => {
        setTogg(!togg);

        if (togg) {
            setFormData({
                id: null,
                firstname: "",
                lastname: "",
                email: "",
                company: { name: "" }
            });
        }
    };

    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        if (isEditing && formData.name) {
            const [firstname, lastname] = formData.name.split(" ");
            setFormData({
                ...formData,
                firstname: firstname || "",
                lastname: lastname || "",
            });
        }
    }, [isEditing, formData]);

    const handleSubmitForm = (e) => {
        e.preventDefault();

        
        if (!formData.company.name) {
            alert("Please enter the department.");
            return;
        }

        const fullName = `${formData.firstname} ${formData.lastname}`;
        const updatedFormData = { ...formData, name: fullName };

        handleSubmit(updatedFormData);
    };

    return (
        <div className="mb-6 p-6 bg-gradient-to-br from-black to-gray-800 shadow-xl rounded-lg max-w-lg mx-auto">
            <div className="w-full h-16 bg-gradient-to-r from-green-500 to-green-700 flex justify-between items-center p-2 rounded-t-lg shadow-lg">
                <button 
                    onClick={handleToggle} 
                    className="w-28 h-12 bg-white text-center rounded-lg text-lg font-semibold text-gray-800 shadow-md hover:bg-green-600 transition-all duration-300"
                >
                    {togg ? "Close" : "Add User"}
                </button>
            </div>

            {togg && (
                <form onSubmit={handleSubmitForm} className="flex flex-col gap-6 mt-6">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={formData.firstname}
                            onChange={handleNameChange}
                            required
                            className="border-2 border-gray-600 bg-black text-white p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleNameChange}
                            required
                            className="border-2 border-gray-600 bg-black text-white p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="border-2 border-gray-600 bg-black text-white p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={formData.company.name}
                        onChange={(e) => setFormData({ ...formData, company: { ...formData.company, name: e.target.value } })}
                        required
                        className="border-2 border-gray-600 bg-black text-white p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                    <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-md hover:bg-green-700 focus:outline-none transition-all duration-300">
                        {isEditing ? "Update" : "Add"} User
                    </button>
                </form>
            )}
        </div>
    );
}
