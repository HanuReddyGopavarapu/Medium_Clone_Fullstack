import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [signininput, setsignininput] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setsignininput((preval) => ({ ...preval, [name]: value }));
    }

    async function handleClick() {
        try {
            const res = await axios.post("https://backend.mediumfullstack.workers.dev/api/v1/user/signin", {
                email: signininput.email,
                password: signininput.password,
            });
            const { token } = res.data;
            localStorage.setItem("token", token);
            navigate("/allpost");
        } catch (error) {
            alert("Invalid credentials");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h1>
                <input
                    onChange={handleChange}
                    name="email"
                    value={signininput.email}
                    type="text"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    onChange={handleChange}
                    name="password"
                    value={signininput.password}
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleClick}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Login
                </button>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default Signin;