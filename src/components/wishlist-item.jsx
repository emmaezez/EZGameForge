import { Link } from "react-router";

export default function WishlistItem({
  id,
  title,
  imageSrc,
  imageAlt,
  metaText,
  description,
  detailPath,
  removeFromWishlist,
}) {
  
  const handleRemove = (e) => {
    e.preventDefault();
    removeFromWishlist(id);
  };

  return (
    <div className="wishlist-item">
      <Link to={detailPath} className="wishlist-item-link">
        <img src={imageSrc} alt={imageAlt} className="wishlist-item-image"/>

        <div className="wishlist-item-main">
          <h3 className="wishlist-item-title">{title}</h3>
          <p className="wishlist-item-meta">{metaText}</p>
          <p className="wishlist-item-description">{description}</p>
        </div>
      </Link>

      <button 
        onClick={handleRemove}
        className="btn btn-remove"
        type="button"
        aria-label={`Remove ${title} from wishlist`}
      >
        ❌ Remove
      </button>
    </div>
  );
}