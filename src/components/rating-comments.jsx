import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext.jsx";

export default function GameDetailSidebar({
  averageRating,
  userRating: initialUserRating,
  comments: initialComments = [],
  gameId,
  gameTitle,
}) {
  const { user } = useAuth();
  const [commentList, setCommentList] = useState(initialComments);
  const [input, setInput] = useState("");
  const [userRating, setUserRating] = useState(initialUserRating ?? "");
  const [ratingInput, setRatingInput] = useState("");
  const [saveError, setSaveError] = useState("");

  // Load comments for this game from Firestore
  useEffect(() => {
    if (!gameId) return;
    getDocs(query(collection(db, "comments"), where("gameId", "==", gameId)))
      .then((snap) => {
        if (!snap.empty) {
          const loaded = snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .sort((a, b) => {
              const ta = a.createdAt?.toMillis?.() ?? 0;
              const tb = b.createdAt?.toMillis?.() ?? 0;
              return ta - tb;
            });
          setCommentList(loaded);
        }
      })
      .catch(() => {});
  }, [gameId]);

  // Load user's existing rating for this game
  useEffect(() => {
    if (!gameId || !user?.uid) return;
    getDocs(
      query(
        collection(db, "ratings"),
        where("gameId", "==", gameId),
        where("userId", "==", user.uid)
      )
    )
      .then((snap) => {
        if (!snap.empty) setUserRating(snap.docs[0].data().value);
      })
      .catch(() => {});
  }, [gameId, user?.uid]);

  const handlePost = (e) => {
    e.preventDefault();
    setSaveError("");
    if (input.trim() === "") return;

    if (!user?.uid) {
      setSaveError("You must be signed in to post a comment.");
      return;
    }

    const author = user.displayName || user.email || "Anonymous";
    const newComment = {
      author,
      time: new Date().toLocaleString(),
      text: input.trim(),
    };

    addDoc(collection(db, "comments"), {
      ...newComment,
      userId: user.uid,
      gameId,
      gameTitle: gameTitle || "",
      createdAt: serverTimestamp(),
    }).catch((err) => {
      console.error("Failed to save comment:", err);
      setSaveError("Failed to save comment. Please try again.");
    });

    setCommentList([...commentList, { id: Date.now(), ...newComment }]);
    setInput("");
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    setSaveError("");
    const num = Number(ratingInput);
    if (isNaN(num) || num < 1 || num > 5) {
      setSaveError("Rating must be a number between 1 and 5.");
      return;
    }

    if (!user?.uid) {
      setSaveError("You must be signed in to submit a rating.");
      return;
    }

    // One doc per user+game so re-submitting updates the rating
    setDoc(
      doc(db, "ratings", `${user.uid}_${gameId}`),
      {
        userId: user.uid,
        gameId,
        gameTitle: gameTitle || "",
        value: num,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    ).catch((err) => {
      console.error("Failed to save rating:", err);
      setSaveError("Failed to save rating. Please try again.");
    });

    setUserRating(num);
    setRatingInput("");
  };

  const getInitial = (name) => {
    const clean = String(name || "G").trim();
    return clean ? clean.charAt(0).toUpperCase() : "G";
  };

  return (
    <>
      {saveError && (
        <p className="error" role="alert" style={{ marginBottom: "0.75rem" }}>
          {saveError}
        </p>
      )}
      <div className="community-panel rating-panel">
        <h2 className="section-subtitle community-title">Community</h2>

        <div className="rating-group">
          <h3 className="section-subtitle">Average Rating</h3>
          <p className="rating-stars">{averageRating ?? "N/A"}</p>
        </div>

        <div className="rating-group">
          <h3 className="section-subtitle">Your Rating</h3>

          <p className="rating-stars">{userRating !== "" ? userRating : "Not rated yet"}</p>

          <form onSubmit={handleRatingSubmit} className="rating-form">
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              className="form-input"
              placeholder="Rate 1–5"
              value={ratingInput}
              onChange={(e) => setRatingInput(e.target.value)}
            />
            <button type="submit" className="btn">
              Submit Rating
            </button>
          </form>
        </div>
      </div>

      <div className="comments-section">
        <h3 className="section-subtitle">Comments</h3>

        <div className="comments-list">
          {commentList.length > 0 ? (
            commentList.map((comment) => (
              <article className="comment-item" key={comment.id}>
                <span className="comment-avatar" aria-hidden="true">
                  {getInitial(comment.author)}
                </span>
                <div className="comment-body">
                  <div className="comment-meta">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-time">{comment.time}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </article>
            ))
          ) : (
            <p className="no-comments">No comments yet.</p>
          )}
        </div>

        <form className="comment-form" onSubmit={handlePost}>
          <label htmlFor="comment-input" className="comment-label">
            Leave your comment:
          </label>
          <div className="comment-input-row">
            <textarea
              id="comment-input"
              className="comment-input"
              rows={3}
              placeholder="Share your thoughts and feedback"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="comment-actions">
              <button type="submit" className="btn">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
