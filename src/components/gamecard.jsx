import { Link } from "react-router";
import { FaHeart } from "react-icons/fa";

export default function GameCard({
  title,
  imageSrc,
  imageAlt,
  ratingText,
  tagsText,
  detailPath,
  downloadUrl,
  id,
  wishlist = [],
  addToWishlist,
  removeFromWishlist,
}) {
  const displayImage = imageSrc || "/assets/default-user-game.png";
  const displayAlt = imageAlt || title || "Game cover";

  const displayRating = ratingText || "N/A";
  const displayTags = tagsText || "";
  const tagItems = displayTags
    .split(/,|·/)
    .map((tag) => tag.trim())
    .filter(Boolean);

  // AI-inspired
  const liked = Array.isArray(wishlist) && wishlist.some((g) => g.id === id);

  const toggleWishlist = () => {
    if (liked) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, title, imageSrc, imageAlt });
    }
  };

  return (
    <article className="game-card">
      <Link to={detailPath} className="game-card-link">
        <div className="game-card-media">
          <img
            src={displayImage}
            alt={displayAlt}
            className="game-card-image"
          />
        </div>

        <div className="game-card-info">
          <h3 className="game-card-title">{title}</h3>

          <p className="game-card-meta">
            {displayRating && (
              <span className="game-card-rating">{displayRating}</span>
            )}
          </p>
          <div className="game-card-meta game-card-tags-wrap">
            {tagItems.map((tag) => (
              <span key={tag} className="game-card-tags">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="game-card-actions">
        <button
          className={`btn btn-secondary btn-wishlist ${liked ? "btn-wishlist-active" : ""}`}
          type="button"
          onClick={toggleWishlist}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          title={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          {liked ? <FaHeart color="red" /> : <FaHeart />}
        </button>

        <a
          className="btn btn-download"
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      </div>
    </article>
  );
}
