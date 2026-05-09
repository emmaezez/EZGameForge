import React, { useState } from "react";

export default function GameDetailSidebar({
  averageRating,
  userRating: initialUserRating,
  comments = []
}) {
  // AI generated //
  const [commentList, setCommentList] = useState(comments);
  const [input, setInput] = useState("");

   const [userRating, setUserRating] = useState(initialUserRating ?? "");
   const [ratingInput, setRatingInput] = useState("");
 
  const handlePost = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newComment = {
      id: Date.now(),
      author: "You",
      time: new Date().toLocaleString(),
      text: input.trim(),
    };

    setCommentList([...commentList, newComment]);
    setInput("");
  };
  // AI generated//

  // Rating submission handler
  const handleRatingSubmit = (e) => {
    e.preventDefault();

    const num = Number(ratingInput);

    if (isNaN(num) || num < 1 || num > 5) {
      alert("Rating must be a number between 1 and 5.");
      return;
    }

    setUserRating(num);
    setRatingInput("");
  };

  return (
    <>
      <div className="rating-panel">

        <div className="rating-group">
          <h2 className="section-subtitle">Average Rating</h2>
          <p className="rating-stars">{averageRating ?? "N/A"}</p>
        </div>

        <div className="rating-group">
          <h2 className="section-subtitle">Your Rating</h2>

          <p className="rating-stars">{userRating !== "" ? userRating : "Not rated yet"}</p>

          {/* Rating input + submit */}
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
        <h2 className="section-subtitle">Comments</h2>

        <div className="comments-list">
          {commentList.length > 0 ? (
            commentList.map(comment => (
              <article className="comment-item" key={comment.id}>
                <div className="comment-meta">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-time">{comment.time}</span>
                </div>

                <p className="comment-text">{comment.text}</p>
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

          <textarea id="comment-input" 
          className="comment-input" 
          rows={3} 
          placeholder="Share your thoughts and feedback"
          value={input}
          onChange={(e) => setInput(e.target.value)}>
          </textarea>

          <div className="comment-actions">
            {/* <button type="button" className="btn">Reply</button> */}
            <button type="submit" className="btn">Post</button>
          </div>
        </form>

      </div>

    </>
  );
}