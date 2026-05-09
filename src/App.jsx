// Human citation statement: The app.jsx and the return statement is done by the entire group.
// The App.jsx is human driven for react routing and demonstrates every 
// group members understanding of react components and imports

// Navbar components
import { Routes, Route } from "react-router";
import NavBar from "./components/navbar.jsx";
import React, { useState, useEffect } from "react";

// Page components
import Home from "./pages/home.jsx";
import Filter from "./pages/filter.jsx";
import Publish from "./pages/publish.jsx";
import GameDetail from "./pages/gamedetail.jsx";

// Future Firebase components
import Account from "./pages/account.jsx";
import ProfileEdit from "./pages/profileedit.jsx";
import Settings from "./pages/settings.jsx";
import LoginPage from "./pages/login-page.jsx";

// Footer components
import Footer from "./components/footer.jsx";
import Guidelines from "./pages/guidelines.jsx";
import About from "./pages/about-page.jsx";

export default function App() {
  const [wishlist, setWishlist] = useState([]);

  const [publishedGames, setPublishedGames] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(saved);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
      setWishlist([]);
    }
  }, []);

  const addToWishlist = (game) => {
    if (!wishlist.some((item) => item.id === game.id)) {
      const newList = [...wishlist, game];
      setWishlist(newList);
      localStorage.setItem("wishlist", JSON.stringify(newList));
    }
  };

  const removeFromWishlist = (gameId) => {
    const newList = wishlist.filter((item) => item.id !== gameId);
    setWishlist(newList);
    localStorage.setItem("wishlist", JSON.stringify(newList));
  };

  const handlePublishGame = (newGame) => {
    const gameWithId = {
      ...newGame,
      id: `pub-${Date.now()}`
    };
    setPublishedGames((prev) => [...prev, gameWithId]);
  };

  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              wishlist={wishlist}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              publishedGames={publishedGames}
            />
          }
        />

        <Route
          path="/filter"
          element={
            <Filter
              wishlist={wishlist}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              publishedGames={publishedGames}
            />
          }
        />


        <Route
          path="/publish"
          element={<Publish onPublishGame={handlePublishGame} />}
        />
        <Route
          path="/gamedetail/:id"
          element={
            <GameDetail
              wishlist={wishlist}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              publishedGames={publishedGames}
            />
          }
        />

        <Route
          path="/account"
          element={
            <Account
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />
          }
        />


        <Route path="/profileedit" element={<ProfileEdit />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/about" element={<About />} />
        <Route path="/login-page" element={<LoginPage />} />
      </Routes>

      <Footer />
    </>
  );
}
