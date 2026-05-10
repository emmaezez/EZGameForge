import { useEffect, useState } from "react";
import GameDetailSidebar from "../components/rating-comments.jsx";
import GameDetailMain from "../components/gamedetail.jsx";
import game from "../data/game.js";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function GameDetail({
  wishlist,
  addToWishlist,
  removeFromWishlist,
  publishedGames = []
}) {
  const { id } = useParams();
  const [firestoreGame, setFirestoreGame] = useState(null);
  const [loading, setLoading] = useState(false);

  const allGames = [...game, ...publishedGames];
  const localGame = allGames.find((g) => g.id === id);

  // If not found locally, try Firestore (covers user-published games)
  useEffect(() => {
    if (localGame || !id) return;
    setLoading(true);
    setFirestoreGame(null);
    getDoc(doc(db, "games", id))
      .then((snap) => {
        if (snap.exists()) setFirestoreGame({ id: snap.id, ...snap.data() });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, localGame]);

  // While fetching from Firestore, don't render anything yet
  if (!localGame && loading) {
    return <main className="page-container game-detail-page"><p className="page-subtitle">Loading…</p></main>;
  }

  const currentGame = localGame || firestoreGame || null;
  if (!currentGame) {
    return <main className="page-container game-detail-page"><p className="page-subtitle">Game not found.</p></main>;
  }

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

  // null means no URL provided — the component will hide the button
  const downloadUrl = currentGame.downloadUrl || currentGame.website || null;

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
            gameId={currentGame.id}
            gameTitle={currentGame.title || currentGame.name}
          />
        </div>
      </section>
    </main>
  );
}