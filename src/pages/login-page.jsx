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
      <section className="settings-coming-soon login-signup-panel">
        <h1 className="page-title">Login / Signup</h1>
        {user ? (
          <div className="login-center">
            <p className="coming-soon-text">
              Signed in as <strong>{user.displayName || user.email}</strong>
            </p>
            <button className="btn btn-secondary" type="button" onClick={logout}>
              Sign out
            </button>
          </div>
        ) : (
          <div className="login-center">
            <p className="coming-soon-text">
              Sign in with your Google account to save your wishlist and publish games.
            </p>
            <button
              className="btn btn-google"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="btn-google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {loading ? "Signing in…" : "Continue with Google"}
            </button>
            {error && <p className="error">{error}</p>}
          </div>
        )}
      </section>
    </main>
  );
}