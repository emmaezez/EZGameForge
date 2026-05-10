import { Link } from "react-router";
import GameCard from "../components/gamecard";
import game from "../data/game.js";

export default function Home({
  wishlist,
  addToWishlist,
  removeFromWishlist,
  publishedGames = []
}) {
  const allGames = [...game, ...publishedGames];

  return (
    <main className="page-container home-page">
      <section className="hero-section">
        <div className="hero-background" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-title">GameForge</h1>
          <p className="hero-subtitle">
            A curated hub where players discover games and creators share their work.
          </p>
          <div className="hero-actions">
            <Link to="/filter" className="btn">Browse Games</Link>
            <Link to="/publish" className="btn btn-secondary">Publish a Game</Link>
          </div>
        </div>
      </section>

      <section className="game-section">
        <h2 className="section-title">Featured Games</h2>

        <div className="game-list">
          {allGames.map((g) => {
            const categories = [
              g.genre,
              g.artStyle,
              g.tag,
              g.playerMode,
              g.playTime,
              g.difficulty,
              g.rating
            ]
              .filter((item) => item && item !== "")
              .join(" · ");

            const ratingText =
              typeof g.averageRating === "number" ? `★ ${g.averageRating.toFixed(1)}` : "N/A";

            return (
              <GameCard
                key={g.id}
                id={g.id}
                title={g.title || g.name}
                imageSrc={g.imageSrc}
                imageAlt={g.imageAlt || (g.title || g.name)}
                ratingText={ratingText}
                tagsText={categories}
                detailPath={`/gamedetail/${g.id}`}
                downloadUrl={g.website}
                wishlist={wishlist}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}