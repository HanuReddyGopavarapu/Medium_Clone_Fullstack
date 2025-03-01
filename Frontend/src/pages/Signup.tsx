import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [signupinput, setsignupinput] = useState({ firstname: "", lastname: "", email: "", password: "" });
    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setsignupinput((preval) => ({ ...preval, [name]: value }));
    }

    async function handlesubmit() {
        try {
            const res = await axios.post("https://backend.mediumfullstack.workers.dev/api/v1/user/signup", {
                firstname: signupinput.firstname,
                lastname: signupinput.lastname,
                email: signupinput.email,
                password: signupinput.password,
            });
            alert("Registration successful");
            navigate("/signin");
        } catch (error) {
            alert("Registration failed");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign Up</h1>
                <input
                    onChange={handleChange}
                    value={signupinput.firstname}
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    onChange={handleChange}
                    value={signupinput.lastname}
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    onChange={handleChange}
                    value={signupinput.email}
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    onChange={handleChange}
                    value={signupinput.password}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handlesubmit}
                    className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
                >
                    Register
                </button>
                <p className="text-center mt-4 text-gray-600">
                    Already have an account? <a href="/signin" className="text-blue-600 hover:underline">Sign In</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;