import { useEffect, useState } from "react";
import axios from "axios";

function Allpost() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token found. Please sign in.");
                return;
            }

            try {
                const res = await axios.get("https://backend.mediumfullstack.workers.dev/api/v1/blog/bulk", {
                    headers: {
                        Authorization: token,
                    },
                });
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">All Posts</h1>
                {posts.map((post, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                        <p className="text-gray-600 mb-4">{post.content}</p>
                        <p className={`text-sm ${post.ispublished ? "text-green-600" : "text-gray-500"}`}>
                            {post.ispublished ? "Published" : "Draft"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Allpost;