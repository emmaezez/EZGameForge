// Template scaffolding Citation for Firebase: 
// While I used a template as a scaffolding to drive the firebase logins and 
// login-page while doing the firebase setup, the firebase auth setup has human driven
// components and debugging

// the account.jsx is mostly human driven debugging and web setup on firebase 
// for react html sections and 
// shows the user's email correctly

// Cite the template and imports from firebase
// firebase.google.com/docs/auth/web/google-signin

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { collection, getDocs, query, where } from "firebase/firestore";

import WishlistItem from "../components/wishlist-item.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { db } from "../firebase";

// Template usage Citation: useAuth() is template driven with 
// human setup on firebase's console and human debugging code to check it works

// Firestore docs in `games` should store the author's uid under one of these fields
// so we can fetch that user's publishes (static game.js seeds have string `developer`,
// not uid—only cloud documents with a uid field appear here).

const GAME_CREATOR_FIELDS = [
  "publisherUid",
  "creatorUid",
  "userId",
  "creatorId",
  "developerId",
  "publisherId",
];

function buildPublishMeta(game) {
  const parts = [game.genre, game.artStyle, game.tag, game.playerMode]
    .filter((v) => v && String(v).trim() !== "");
  return parts.length ? parts.join(" · ") : "";
}

function getPublishedTitle(game) {
  return game.title || game.name || "Untitled";
}

function getPublishedThumb(game) {
  return (
    game.imageSrc || "/assets/default-user-game.png"
  );
}

// This component expects 'wishlist' data and a 'removeFromWishlist' function 
// to be passed in as props from a parent component that manages that state.
export default function Account({ wishlist, removeFromWishlist }) {
  const { user } = useAuth(); // This uses the firebase logic utilized with help from template

  const [myGames, setMyGames] = useState([]);

  useEffect(() => {
    let cancelled = false;

    if (!user?.uid) {
      Promise.resolve().then(() => {
        if (!cancelled) setMyGames([]);
      });
      return () => {
        cancelled = true;
      };
    }

    const loadMine = async () => {
      const byId = new Map();
      try {
        const uid = user.uid;
        await Promise.all(
          GAME_CREATOR_FIELDS.map(async (field) => {
            try {
              const qRef = query(
                collection(db, "games"),
                where(field, "==", uid)
              );
              const snapshot = await getDocs(qRef);
              snapshot.docs.forEach((docSnap) => {
                const data = docSnap.data();
                byId.set(docSnap.id, { id: docSnap.id, ...data });
              });
            } catch {
              /* ignore per-field failures (indexes, legacy schema) */
            }
          })
        );
        if (!cancelled) {
          setMyGames(Array.from(byId.values()));
        }
      } catch (error) {
        console.error("Failed to fetch my published games", error);
        if (!cancelled) setMyGames([]);
      }
    };

    loadMine();

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

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

        {user && (
          <section className="account-published-section">
            <h2 className="section-title">My Published Games</h2>

            {myGames.length === 0 ? (
              <p className="account-published-empty">
                You haven&apos;t published any games yet.
              </p>
            ) : (
              <ul className="account-published-list">
                {myGames.map((game) => {
                  const thumb = getPublishedThumb(game);
                  const title = getPublishedTitle(game);
                  const meta = buildPublishMeta(game);
                  const when =
                    game.publishDate ||
                    game.publish_date ||
                    (game.createdAt &&
                    typeof game.createdAt.toDate === "function"
                      ? game.createdAt.toDate().toLocaleDateString()
                      : "") ||
                    "";

                  return (
                    <li key={game.id} className="account-published-item">
                      <img
                        src={thumb}
                        alt={game.imageAlt || title}
                        className="account-published-thumb"
                      />
                      <div className="account-published-main">
                        <p className="account-published-title">{title}</p>
                        {when ? (
                          <p className="account-published-date">{when}</p>
                        ) : null}
                        {meta ? (
                          <p className="account-published-tags">{meta}</p>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        )}

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
