import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import { useAuth } from "../context/AuthContext.jsx";
import { db } from "../firebase";

const DEFAULT_DESCRIPTION =
  "This is your profile description. You can introduce yourself as a player or developer, list your interests, or share what kind of games you enjoy.";

const SAVE_TIMEOUT_MS = 30000;

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`${label} timed out after ${ms}ms`)),
        ms
      )
    ),
  ]);
}

export default function ProfileEdit() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isSignedIn = Boolean(user);

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("player");
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      setProfileLoaded(true);
      return undefined;
    }

    let cancelled = false;

    const loadProfile = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (cancelled) return;

        const data = snap.exists() ? snap.data() : {};

        setDisplayName(
          typeof data.displayName === "string"
            ? data.displayName
            : user.displayName ?? ""
        );
        setRole(data.role === "developer" ? "developer" : "player");
        setDescription(
          typeof data.description === "string" && data.description.trim()
            ? data.description
            : DEFAULT_DESCRIPTION
        );
      } catch (error) {
        console.error("[ProfileEdit] load profile error:", error);
        setDisplayName(user.displayName ?? "");
      } finally {
        if (!cancelled) setProfileLoaded(true);
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.uid) return;

    const userRef = doc(db, "users", user.uid);
    const payload = {
      displayName: displayName.trim(),
      role,
      description: description.trim(),
      updatedAt: serverTimestamp(),
      email: user.email ?? null,
    };

    setSaving(true);
    try {
      await withTimeout(
        setDoc(userRef, payload, { merge: true }),
        SAVE_TIMEOUT_MS,
        "Firestore setDoc"
      );

      if (displayName.trim()) {
        await withTimeout(
          updateProfile(user, { displayName: displayName.trim() }),
          SAVE_TIMEOUT_MS,
          "Auth updateProfile"
        );
      }

      navigate("/account");
    } catch (error) {
      console.error("[ProfileEdit] save failed:", error);
    } finally {
      setSaving(false);
    }
  };

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

        <form className="account-edit-form" onSubmit={handleSubmit}>
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
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={!isSignedIn || !profileLoaded}
              />
            </div>
          </div>

          <div className="form-row account-email-display">
            <div className="form-field">
              <span className="form-label">Email</span>
              <p className="form-text">{user?.email ?? "player123@example.com"}</p>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="account-role" className="form-label">
                Role
              </label>

              <select
                id="account-role"
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={!isSignedIn || !profileLoaded}
              >
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!isSignedIn || !profileLoaded}
              />
            </div>
          </div>

          <div className="form-row form-actions">
            <Link to="/account" className="btn">
              Cancel
            </Link>

            <button
              type="submit"
              className="btn"
              disabled={!isSignedIn || !profileLoaded || saving}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
