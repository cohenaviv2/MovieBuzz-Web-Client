import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MovieDetails from "./components/Movie/MovieDetails/MovieDetails";
import TvShowDetails from "./components/Movie/TvShowDetails/TvShowDetails";
import ViewPosts from "./pages/ViewPosts";
import NewPost from "./pages/NewPost";
import useAuthentication from "./hooks/useAuthentication";
import PostDetails from "./components/Post/PostDetails/PostDetails";

function App() {
  const { auth, isLoading, error, loggedIn, login, googleSignin, logout, register,refreshToken } = useAuthentication();

  return (
    <>
      <Router>
        <Header />
        <Navbar auth={auth} />
        <Routes>
          <Route path="/" element={<Home auth={auth} />} />
          <Route path="/signup" element={<SignUp error={error} register={register} />} />
          <Route path="/login" element={<Login login={login} googleSignin={googleSignin} auth={auth} error={error} isLoading={isLoading} loggedIn={loggedIn} />} />
          <Route path="/profile" element={<Profile auth={auth} logout={logout} isLoading={isLoading} refreshToken={refreshToken} />} />
          <Route path="/search" Component={Search} />
          <Route path="/movies" Component={Movies} />
          <Route path="/movie/:id" Component={MovieDetails} />
          <Route path="/movie/:id/posts" Component={ViewPosts} />
          <Route path="/tv" Component={TvShows} />
          <Route path="/tv/:id" Component={TvShowDetails} />
          <Route path="/tv/:id/posts" Component={ViewPosts} />
          <Route path="/new-post" element={<NewPost auth={auth} />} />
          <Route path="/post/:id" element={<PostDetails auth={auth} />} />
          <Route path="/chat" element={<Chat auth={auth} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
