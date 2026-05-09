// Template scaffolding Citation for Firebase: 
// While I used a template as a scaffolding to drive the firebase logins and 
// login-page while doing the firebase setup, the firebase auth setup has human driven
// components and debugging

// the account.jsx is mostly human driven debugging and web setup on firebase 
// for react html sections and 
// shows the user's email correctly

// Cite the template and imports from firebase
// firebase.google.com/docs/auth/web/google-signin

import { Link } from "react-router";
import WishlistItem from "../components/wishlist-item.jsx";
import { useAuth } from "../context/AuthContext.jsx";

// Template usage Citation: useAuth() is template driven with 
// human setup on firebase's console and human debugging code to check it works

// This component expects 'wishlist' data and a 'removeFromWishlist' function 
// to be passed in as props from a parent component that manages that state.
export default function Account({ wishlist, removeFromWishlist }) {
  const { user } = useAuth(); // This uses the firebase logic utilized with help from template

  // human driven logic for mapping wishlist components like adding or removing items
  return (
    <main>
      <div className="page-container">
        
        {/* --- Account Profile Section (from the Firebase version) --- */}
        <section className="account-profile-section">
          <h1 className="page-title">Account</h1>
          
          {user ? (
            // Display profile if user is signed in
            <div className="account-profile-card">
              <div className="account-info">
                <p className="account-name">{user.displayName ?? "Anonymous Player"}</p>
                <p className="account-email">{user.email}</p>

                <p className="account-role">
                  <span className="account-label">Role:</span> Player
                </p>

                <p className="account-description">
                  This is your profile description. You can introduce yourself as a player or
                  developer, list your interests, or share what kind of games you enjoy.
                </p>

                <Link to="/profileedit" className="btn account-edit-button">
                  Edit Profile
                </Link>
              </div>
            </div>
          ) : (
            // Prompt to sign in if user is not signed in
            <p className="coming-soon-text account-login-hint">
              You are not signed in yet.{" "}
              <Link to="/login-page" className="link-primary">
                Sign in with Google
              </Link>{" "}
              to see your profile information.
            </p>
          )}
        </section>

        {/* --- Wishlist Section (from the original wishlist version) --- */}
        {/* Only show the wishlist section if the user is logged in, or always show it depending on your app logic */}
        {user && ( 
          <section className="account-wishlist-section">
            <h2 className="section-title">Wishlist</h2>   

            <div className="wishlist-list">
              {wishlist && wishlist.length > 0 ? (
                wishlist.map((game) => (
                  <WishlistItem
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    imageSrc={game.imageSrc}
                    imageAlt={game.imageAlt}
                    metaText={game.metaText}
                    description={game.description}
                    detailPath={`/gamedetail/${game.id}`}
                    removeFromWishlist={removeFromWishlist}
                  />
                ))
                ) : (
                <div className="wishlist-empty">
                    <p>You haven't added any games to your wishlist yet.</p>
                </div>
                )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
