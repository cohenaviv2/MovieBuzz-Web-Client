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
import { useState } from "react";
import MovieDetails from "./components/movie/MovieDetails/MovieDetails";
import SignUp from "./pages/SignUp";
// import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/search" Component={Search} />
          <Route path="/movies" Component={Movies} />
          <Route path="/tv" Component={TvShows} />
          <Route path="/chat" Component={Chat} />
          <Route path="/profile" Component={isLoggedIn ? Profile : Login} />
          <Route path="/signup" Component={SignUp} />
          {/* <Route path="/movie/:id" Component={MovieDetails} /> */}
          {/* <Route path="/tv/:id" Component={MovieDetails} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
