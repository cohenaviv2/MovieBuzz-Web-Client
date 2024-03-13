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
// import useRegisteration from "./hooks/useRegisteration";

function App() {
  const { auth, isLoading, error, loggedIn, login, logout, register } = useAuthentication();
  // const { success: RegSuccess, loading: RegLoading, error: RegError, uploadImageAndRegister } = useRegisteration();(user: IUser) => void

  return (
    <>
      <Router>
        <Header />
        <Navbar auth={auth} />
        <Routes>
          <Route path="/" element={<Home auth={auth} />} />
          <Route path="/search" Component={Search} />
          <Route path="/movies" Component={Movies} />
          <Route path="/tv" Component={TvShows} />
          <Route path="/chat" element={<Chat auth={auth} />} />
          <Route path="/profile" element={auth ? <Profile auth={auth} logout={logout} /> : <Login login={login} error={error} isLoading={isLoading} loggedIn={loggedIn} />} />
          <Route path="/signup" element={<SignUp error={error} register={register} />} />
          <Route path="/movie/:id" Component={MovieDetails} />
          <Route path="/tv/:id" Component={TvShowDetails} />
          <Route path="/movie/:id/posts" Component={ViewPosts} />
          <Route path="/tv/:id/posts" Component={ViewPosts} />
          <Route path="/new-post" element={<NewPost auth={auth} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
