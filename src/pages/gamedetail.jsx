import GameDetailSidebar from "../components/rating-comments.jsx";
import GameDetailMain from "../components/gamedetail.jsx";
import game from "../data/game.js";
import { useParams } from "react-router";

export default function GameDetail({
  wishlist,
  addToWishlist,
  removeFromWishlist,
  publishedGames = []
}) {
  const { id } = useParams();

  const allGames = [...game, ...publishedGames];

  const currentGame = allGames.find((g) => g.id === id) || allGames[0] || game[0];

  const tagsText =
    currentGame.tagsText ||
    [
      currentGame.genre,
      currentGame.artStyle,
      currentGame.tag,
      currentGame.playerMode,
      currentGame.playTime,
      currentGame.difficulty,
      currentGame.rating
    ]
      .filter((item) => item && item !== "")
      .join(" · ");

  const developer = currentGame.developer || "Independent Creator";

  const downloadUrl = currentGame.downloadUrl || currentGame.website || "#";

  const averageRating =
    typeof currentGame.averageRating === "number" ? currentGame.averageRating : null;

  const userRating =
    typeof currentGame.userRating === "number" ? currentGame.userRating : null;

  const comments = Array.isArray(currentGame.comments) ? currentGame.comments : [];

  const publishDate = currentGame.publishDate || currentGame.releaseDate || "";

  return (
    <main className="page-container game-detail-page">
      {/* <button
        className="comments-toggle"
        aria-label="Open comments and rating"
        type="button"
      >
        Comments &amp; Rating
      </button> */}

      <section className="game-detail-layout">
        <div className="game-detail-main">
          <GameDetailMain
            title={currentGame.title || currentGame.name}
            imageSrc={currentGame.imageSrc}
            imageAlt={currentGame.imageAlt || currentGame.title || currentGame.name}
            tagsText={tagsText}
            developer={developer}
            description={currentGame.description}
            downloadUrl={downloadUrl}
            publishDate={publishDate}
            id={currentGame.id}
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
          />
        </div>

        <div className="game-detail-sidebar">
          <GameDetailSidebar
            averageRating={averageRating}
            userRating={userRating}
            comments={comments}
          />
        </div>
      </section>
    </main>
  );
}