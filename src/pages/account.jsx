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
import { Link, useLocation } from "react-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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

/**
 * Mirrors GameDetail data: parent game fields `averageRating` + inline `comments[]`,
 * with optional Firestore subcollections `comments` / `ratings` when used for scale-out.
 */
function ratingValueFromDoc(d) {
  if (typeof d.rating === "number") return d.rating;
  if (typeof d.value === "number") return d.value;
  if (typeof d.score === "number") return d.score;
  if (typeof d.stars === "number") return d.stars;
  return null;
}

async function fetchGameCommunityStats(gameId, gameFallback) {
  let averageRating =
    typeof gameFallback.averageRating === "number"
      ? gameFallback.averageRating
      : null;
  let ratingsCount =
    typeof gameFallback.ratingCount === "number"
      ? gameFallback.ratingCount
      : typeof gameFallback.ratingsCount === "number"
        ? gameFallback.ratingsCount
        : null;
  let commentCount =
    typeof gameFallback.commentCount === "number"
      ? gameFallback.commentCount
      : typeof gameFallback.commentsCount === "number"
        ? gameFallback.commentsCount
        : null;

  try {
    const gameSnap = await getDoc(doc(db, "games", gameId));
    if (gameSnap.exists()) {
      const data = gameSnap.data();
      if (typeof data.averageRating === "number") {
        averageRating = data.averageRating;
      }
      if (typeof data.ratingCount === "number") {
        ratingsCount = data.ratingCount;
      } else if (typeof data.ratingsCount === "number") {
        ratingsCount = data.ratingsCount;
      }
      if (typeof data.commentCount === "number") {
        commentCount = data.commentCount;
      } else if (typeof data.commentsCount === "number") {
        commentCount = data.commentsCount;
      } else if (Array.isArray(data.comments)) {
        commentCount = data.comments.length;
      }
    }
  } catch {
    /* Firestore unavailable or denied */
  }

  try {
    const commentsSnap = await getDocs(
      collection(db, "games", gameId, "comments")
    );
    if (commentsSnap.size > 0) {
      commentCount = commentsSnap.size;
    }
  } catch {
    /* Missing subcollection or rules */
  }

  try {
    const ratingsSnap = await getDocs(
      collection(db, "games", gameId, "ratings")
    );
    const vals = [];
    ratingsSnap.forEach((d) => {
      const v = ratingValueFromDoc(d.data());
      if (v != null && !Number.isNaN(v)) vals.push(v);
    });
    if (vals.length > 0) {
      ratingsCount = vals.length;
      if (averageRating == null || Number.isNaN(averageRating)) {
        averageRating = vals.reduce((a, b) => a + b, 0) / vals.length;
      }
    }
  } catch {
    /* Missing subcollection or rules */
  }

  if (commentCount == null && Array.isArray(gameFallback.comments)) {
    commentCount = gameFallback.comments.length;
  }

  const rc = ratingsCount ?? 0;
  const cc = commentCount ?? 0;
  const avg =
    typeof averageRating === "number" && !Number.isNaN(averageRating)
      ? Math.round(averageRating * 10) / 10
      : null;

  return { averageRating: avg, ratingsCount: rc, commentCount: cc };
}

function formatAverageRating(stats) {
  const a = stats?.averageRating;
  if (typeof a === "number" && !Number.isNaN(a)) {
    return a.toFixed(1);
  }
  return "N/A";
}

// This component expects 'wishlist' data and a 'removeFromWishlist' function 
// to be passed in as props from a parent component that manages that state.
export default function Account({ wishlist, removeFromWishlist }) {
  const { user } = useAuth(); // This uses the firebase logic utilized with help from template
  const location = useLocation();

  const [accountRoleLabel, setAccountRoleLabel] = useState("Player");

  const [myGames, setMyGames] = useState([]);
  const [publishedStats, setPublishedStats] = useState({});
  const [myComments, setMyComments] = useState([]);
  const [myRatings, setMyRatings] = useState([]);

  useEffect(() => {
    let cancelled = false;

    if (!user?.uid) {
      Promise.resolve().then(() => {
        if (!cancelled) setAccountRoleLabel("Player");
      });
      return () => {
        cancelled = true;
      };
    }

    const loadRole = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (cancelled) return;
        const data = snap.exists() ? snap.data() : {};
        setAccountRoleLabel(data.role === "developer" ? "Developer" : "Player");
      } catch {
        if (!cancelled) setAccountRoleLabel("Player");
      }
    };

    loadRole();

    return () => {
      cancelled = true;
    };
  }, [user?.uid, location.pathname]);

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

  useEffect(() => {
    let cancelled = false;

    if (!myGames.length) {
      Promise.resolve().then(() => {
        if (!cancelled) setPublishedStats({});
      });
      return () => {
        cancelled = true;
      };
    }

    const loadStats = async () => {
      try {
        const pairs = await Promise.all(
          myGames.map(async (game) => {
            const stats = await fetchGameCommunityStats(game.id, game);
            return [game.id, stats];
          })
        );
        if (!cancelled) {
          setPublishedStats(Object.fromEntries(pairs));
        }
      } catch (error) {
        console.error("Failed to fetch rating/comment summaries", error);
        if (!cancelled) setPublishedStats({});
      }
    };

    loadStats();

    return () => {
      cancelled = true;
    };
  }, [myGames]);

  // Load this user's comments and ratings from Firestore
  useEffect(() => {
    let cancelled = false;
    if (!user?.uid) {
      setMyComments([]);
      setMyRatings([]);
      return;
    }

    const load = async () => {
      try {
        const [commentsSnap, ratingsSnap] = await Promise.all([
          getDocs(query(collection(db, "comments"), where("userId", "==", user.uid))),
          getDocs(query(collection(db, "ratings"),  where("userId", "==", user.uid))),
        ]);
        if (cancelled) return;

        const comments = commentsSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0));

        const ratings = ratingsSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0));

        setMyComments(comments);
        setMyRatings(ratings);
      } catch {
        if (!cancelled) { setMyComments([]); setMyRatings([]); }
      }
    };

    load();
    return () => { cancelled = true; };
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
                <div className="account-header">
                  <div className="account-avatar" aria-hidden="true">
                    {(user.displayName ?? user.email ?? "?")[0].toUpperCase()}
                  </div>
                  <div className="account-name-row">
                    <p className="account-name">{user.displayName ?? "Anonymous Player"}</p>
                    <p className="account-email">{user.email}</p>
                  </div>
                </div>

                <p className="account-role">
                  <span className="account-label">Role:</span> {accountRoleLabel}
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
                  const stats = publishedStats[game.id];
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
                    <li key={game.id}>
                      <Link
                        to={`/gamedetail/${game.id}`}
                        className="account-published-item"
                        style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem" }}
                      >
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
                          <p className="account-published-stats" aria-live="polite">
                            Average rating: {formatAverageRating(stats)} ·
                            Ratings: {stats?.ratingsCount ?? 0} · Comments:{" "}
                            {stats?.commentCount ?? 0}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        )}

        {/* --- My Comments & Ratings Section --- */}
        {user && (
          <section className="account-published-section">
            <h2 className="section-title">My Comments &amp; Ratings</h2>

            {myComments.length === 0 && myRatings.length === 0 ? (
              <p className="account-published-empty">You haven&apos;t commented or rated any games yet.</p>
            ) : (
              <ul className="account-published-list">
                {/* Ratings */}
                {myRatings.map((r) => (
                  <li key={r.id}>
                    <Link
                      to={`/gamedetail/${r.gameId}`}
                      className="account-published-item"
                      style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem" }}
                    >
                      <div className="account-published-main">
                        <p className="account-published-title">⭐ {r.gameTitle || r.gameId}</p>
                        <p className="account-published-tags">Your rating: {r.value} / 5</p>
                        {r.createdAt?.toDate && (
                          <p className="account-published-date">{r.createdAt.toDate().toLocaleDateString()}</p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
                {/* Comments */}
                {myComments.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={`/gamedetail/${c.gameId}`}
                      className="account-published-item"
                      style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem" }}
                    >
                      <div className="account-published-main">
                        <p className="account-published-title">💬 {c.gameTitle || c.gameId}</p>
                        <p className="account-published-tags" style={{ fontStyle: "italic" }}>&ldquo;{c.text}&rdquo;</p>
                        {c.createdAt?.toDate && (
                          <p className="account-published-date">{c.createdAt.toDate().toLocaleDateString()}</p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
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
