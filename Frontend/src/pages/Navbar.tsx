import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoggedIn(false);
            return;
        }

        setIsLoggedIn(true);

        async function fetchUser() {
            try {
                const res = await axios.get("https://backend.mediumfullstack.workers.dev/api/v1/user/me", {
                    headers: {
                        Authorization: token,
                    },
                });
                setUsername(res.data.firstname);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/signin");
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Medium_Clone</h1>
                <div className="flex items-center space-x-6">
                    {isLoggedIn && (
                        <>
                            <span className="text-white text-sm">Welcome, {username}</span>
                            <Link to="/blog" className="text-white hover:text-blue-200 transition duration-300">
                                Create Post
                            </Link>
                            <Link to="/allpost" className="text-white hover:text-blue-200 transition duration-300">
                                See Posts
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <Link to="/signin" className="text-white hover:text-blue-200 transition duration-300">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;