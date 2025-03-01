import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import Allpost from "./pages/Allpost";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./pages/Navbar";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/blog"
                    element={
                        <ProtectedRoute>
                            <Blog />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/allpost"
                    element={
                        <ProtectedRoute>
                            <Allpost />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Signin />} />
            </Routes>
        </Router>
    );
}

export default App;