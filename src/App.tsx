import { useState } from "react";
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
import { IUser } from "./services/Types";
import TvShowDetails from "./components/Movie/TvShowDetails/TvShowDetails";
import ViewPosts from "./pages/ViewPosts";
import NewPost from "./pages/NewPost";

function App() {
  const [profile, setProfile] = useState<IUser | null>(null);

  return (
    <>
      <Router>
        <Header />
        <Navbar profile={profile} />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/search" Component={Search} />
          <Route path="/movies" Component={Movies} />
          <Route path="/tv" Component={TvShows} />
          <Route path="/chat" Component={Chat} />
          <Route path="/profile" element={profile ? <Profile profile={profile} /> : <Login setProfile={setProfile} />} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/movie/:id" Component={MovieDetails} />
          <Route path="/tv/:id" Component={TvShowDetails} />
          <Route path="/movie/:id/posts" Component={ViewPosts} />
          <Route path="/tv/:id/posts" Component={ViewPosts} />
          <Route path="/new-post" Component={NewPost} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
