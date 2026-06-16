import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate
} from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Categories from "./pages/Categories";
import MyFeed from "./components/MyFeed";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup"; 
import NavBar from "./components/NavBar";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import VideoPlayer from './components/videoPlayer';
import SearchResults from "./pages/SearchResults";
import Explore from "./pages/Explore";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated)
  
  return isAuthenticated ? children : <Navigate to={"/"} />
}

function Layout() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="App">
        <Outlet />
      </div>
    </React.Fragment>
  );
}
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/categories/:tag"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myfeed"
              element={
                <ProtectedRoute>
                  <MyFeed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/video/:videoId"  
              element={<VideoPlayer />}
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
