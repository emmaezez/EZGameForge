import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProfileEdit() {
  const { user } = useAuth();
  const isSignedIn = Boolean(user);
  const displayName = user?.displayName ?? "";
  const email = user?.email ?? "";

  // Cite the template and imports from firebase
  // firebase.google.com/docs/auth/web/google-signin

  // Template or AI / Human Driven Code Citation: This is part of the firebase logic and 
  // used it as both a template scaffolding and human driven logic of 
  // setting up the firebase logins where a user 
  // should sign up to update their profile 
  // which should be an interactive feature where users can 
  // create accounts and profiles to publish or wishlist their items

  // The !isSignedIn logic is with support from firebase template to 
  // drive the login logic, the form and and inputs are human driven.
  return (
    <main className="page-container">
      <section className="account-edit-section">
        <h1 className="page-title">Edit Profile</h1>
        <p className="page-subtitle">
          Update your profile information and how you appear in GameForge.
        </p>

        {!isSignedIn && (
          <p className="coming-soon-text account-login-hint">
            You must{" "}
            <Link to="/login-page" className="link-primary">
              sign in with Google
            </Link>{" "}
            before you can update your profile.
          </p>
        )}

        <form className="account-edit-form">

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="account-name" className="form-label">
                Display Name
              </label>
              <input
                id="account-name"
                type="text"
                className="form-input"
                placeholder="Enter your display name"
                defaultValue={displayName}
                disabled={!isSignedIn}
              />
            </div>
          </div>

          <div className="form-row account-email-display">
            <div className="form-field">
              <span className="form-label">Email</span>
              <p className="form-text">{email || "player123@example.com"}</p>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="account-role" className="form-label">
                Role
              </label>

              <select id="account-role" className="form-input" defaultValue="player" disabled={!isSignedIn}>
                <option value="player">Player</option>
                <option value="developer">Developer</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="account-description" className="form-label">
                Description
              </label>

              <textarea
                id="account-description"
                className="form-textarea"
                rows={4}
                placeholder="Introduce yourself..."
                defaultValue={`This is your profile description. You can introduce yourself as a player or developer, list your interests, or share what kind of games you enjoy.`}
                disabled={!isSignedIn}
              />
            </div>
          </div>

          <div className="form-row form-actions">
            <Link to="/account" className="btn">
              Cancel
            </Link>

            <button type="submit" className="btn" disabled={!isSignedIn}>
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}