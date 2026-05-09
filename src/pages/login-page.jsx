// Cite the template and imports from firebase
// firebase.google.com/docs/auth/web/google-signin

// To demonstrate the learning of firebase authentication, 
// I utilized the firebase console and did a setup 
// with help from template. 

// Citation of try catch logic: Contains some template logic from the popup mode to 
// implement the google auth, but I debugged and did checks to make sure it worked
// firebase.google.com/docs/auth/web/google-signin#web

// Citation of page container: Human react-component and basic react
// imports other than the signup logic

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useAuth } from "../context/AuthContext.jsx";

// The try catch is inspired by lecture, but with refinement from AI as login scaffolding

// This function helps drive firebase with logic from pop up mode docs, 
// but other than the code template, the authentication contains human driven setup
export default function LoginPage() {
  const { user, logout } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // The return statement is human driven with a template for button
  return (
    <main className="page-container">
      <section className="settings-coming-soon">
        <h1 className="page-title">Login / Signup</h1>
        {user ? (
          <>
            <p className="coming-soon-text">
              Signed in as <strong>{user.displayName || user.email}</strong>
            </p>
            <button className="btn" type="button" onClick={logout}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <p className="coming-soon-text">
              Use Google to sign in and keep your wishlist synced across devices.
            </p>
            <button
              className="btn"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Continue with Google"}
            </button>
            {error && <p className="error">{error}</p>}
          </>
        )}
      </section>
    </main>
  );
}