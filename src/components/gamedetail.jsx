import { FaHeart, FaDownload } from "react-icons/fa";

export default function GameDetailMain({
  title,
  imageSrc,
  imageAlt,
  tagsText,
  developer,
  publishDate,
  description,
  downloadUrl,
  id,
  wishlist = [],
  addToWishlist,
  removeFromWishlist,
}) {
  const isLiked = wishlist.some((g) => g.id === id);

  const handleWishlist = () => {
    if (isLiked) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        title,
        imageSrc,
        imageAlt,
      });
    }
  };

  const displayDeveloper = developer || "Independent Creator";
  const displayPublishDate = publishDate || "N/A";

  return (
    <div className="game-info-panel">
      <div className="game-media">
        <div className="game-media-main">
          <img src={imageSrc} alt={imageAlt} className="game-media-image" />
        </div>
      </div>

      <div className="game-info">
        <h1 className="game-title">{title}</h1>

        <div className="game-meta">
          <p className="game-tags">{tagsText}</p>

          <p className="game-author">
            <span className="meta-label">Developer:</span> {displayDeveloper}
          </p>

          <p className="game-author">
            <span className="meta-label">Release Date:</span> {displayPublishDate}
          </p>
        </div>

        <div className="game-description">
          <h2 className="section-subtitle">Description</h2>
          <p>{description}</p>
        </div>

        <div className="game-actions">
          <button
            type="button"
            className="btn btn-wishlist"
            onClick={handleWishlist}
            aria-label={`Add to wishlist`}
          >
            {isLiked ? <FaHeart color="red" /> : <FaHeart />} Wishlist
          </button>

          <a
            href={downloadUrl}
            className="btn btn-download"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}