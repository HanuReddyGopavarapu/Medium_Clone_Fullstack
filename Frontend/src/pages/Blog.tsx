import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Blog() {
    const [postinput, setpostinput] = useState({ title: "", content: "", publish: false });
    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            setpostinput((prevVal) => ({ ...prevVal, [name]: checked }));
        } else {
            setpostinput((prevVal) => ({ ...prevVal, [name]: value }));
        }
    }

    async function handleClick() {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You are not authenticated!");
            return;
        }

        try {
            const res = await axios.post(
                "https://backend.mediumfullstack.workers.dev/api/v1/blog/post",
                {
                    title: postinput.title,
                    content: postinput.content,
                    ispublished: postinput.publish,
                },
                {
                    headers: { Authorization: token },
                }
            );
            alert("Post created successfully");
            navigate("/allpost");
        } catch (error) {
            alert("Failed to create post");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Blog Post</h1>
                <input
                    onChange={handleChange}
                    name="title"
                    value={postinput.title}
                    type="text"
                    placeholder="Title"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    onChange={handleChange}
                    name="content"
                    value={postinput.content}
                    type="text"
                    placeholder="Content"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center mb-6">
                    <input
                        onChange={handleChange}
                        name="publish"
                        checked={postinput.publish}
                        type="checkbox"
                        className="mr-2 w-5 h-5"
                    />
                    <label className="text-gray-700">Publish</label>
                </div>
                <button
                    onClick={handleClick}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Post
                </button>
            </div>
        </div>
    );
}

export default Blog;