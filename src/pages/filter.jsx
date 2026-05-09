import { useState } from "react";
import GameCard from "../components/gamecard";
import gameData from "../data/game.js";

export default function Filters({
  wishlist,
  addToWishlist,
  removeFromWishlist,
  publishedGames = [],
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtStyles, setSelectedArtStyles] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPlaytimes, setSelectedPlaytimes] = useState([]);
  const [selectedReleaseDates, setSelectedReleaseDates] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  // AI generated //
  const baseGames = [...gameData, ...publishedGames];
  // AI generated //
  const getTagsText = (game) => {
    return (
      game.tagsText ||
      [
        game.genre,
        game.artStyle,
        game.tag,
        game.playerMode,
        game.playTime,
        game.difficulty,
        game.rating,
      ]
        .filter(Boolean)
        .join(", ")
    );
  };

  const availableGenres = ['Action', 'Adventure', 'RPG', 'Simulation', 'Strategy', 'Sports', 'Racing', 'Puzzle', 'Horror', 'Fighting', 'Sandbox', 'Others'];
  const availableArtStyles = ['Pixel / Retro', 'Hand-drawn', 'Realistic', 'Minimalist', 'Sci-Fi', 'Fantasy', 'Cartoon', 'Historical', 'Cozy', 'Post-apocalyptic', 'Others'];
  const availableModes = ['Single Player', 'MMO', 'PvP', 'PvE', 'Local Co-op', 'Online Co-op', 'Cross Platform', 'Others'];
  const availableTags = ['Story-rich', 'Open World', 'Exploration', 'Survival', 'Crafting', 'Multiplayer', 'VR Compatible', 'Controller Support', 'Others'];
  const availablePlaytimes = ['Short (< 5h)', 'Medium (5~20h)', 'Long (20~60h)', 'Very Long (60+h)', 'Endless / Replayable', 'Others'];
  const availableReleaseDates = ['New (Past Year)', 'Recent (3~4 Years)', 'Classic (5+ Years)', 'Remake / Remaster', 'Early Access', 'Upcoming', 'Others'];
  const availableDifficulties = ['Easy', 'Normal', 'Hard', 'Hardcore', 'Soulslike', 'Others'];
  const availableRatings = ['Top Rated', 'Most Played', 'Trending', 'Award-winning', 'Hidden Gems', 'Others'];

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleArtStyleChange = (style) => {
    setSelectedArtStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleModeChange = (mode) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePlaytimeChange = (playtime) => {
    setSelectedPlaytimes((prev) =>
      prev.includes(playtime)
        ? prev.filter((p) => p !== playtime)
        : [...prev, playtime]
    );
  };

  const handleReleaseDateChange = (date) => {
    setSelectedReleaseDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };
  // AI generated //
  const getFilteredGames = () => {
    let filtered = baseGames;

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((game) => {
        const tagsText = getTagsText(game).toLowerCase();
        const title = game.title ? game.title.toLowerCase() : "";
        const description = game.description
          ? game.description.toLowerCase()
          : "";
        const developer = game.developer ? game.developer.toLowerCase() : "";

        return (
          title.includes(query) ||
          tagsText.includes(query) ||
          description.includes(query) ||
          developer.includes(query)
        );
      });
    }

    if (selectedGenres.length > 0) {
      filtered = filtered.filter((game) => {
        const tagsText = getTagsText(game);
        return selectedGenres.some((genre) => tagsText.includes(genre));
      });
    }
    // AI generated //
    if (selectedArtStyles.length > 0) {
      filtered = filtered.filter((game) => {
        const tagsText = getTagsText(game);
        return selectedArtStyles.some(
          (style) =>
            tagsText.includes(style) ||
            (game.artStyle && game.artStyle.includes(style))
        );
      });
    }

    if (selectedModes.length > 0) {
      filtered = filtered.filter((game) => {
        const tagsText = getTagsText(game);
        return selectedModes.some((mode) => tagsText.includes(mode));
      });
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((game) => {
        const tagsText = getTagsText(game);
        return selectedTags.some((tag) => tagsText.includes(tag));
      });
    }

    if (selectedPlaytimes.length > 0) {
      filtered = filtered.filter((game) => {
        const playtimeText = game.playTime || "";
        return selectedPlaytimes.some((time) => playtimeText.includes(time));
      });
    }

    if (selectedReleaseDates.length > 0) {
      filtered = filtered.filter((game) => {
        const releaseText = game.releaseDate || game.publishDate || "";
        return selectedReleaseDates.some((date) => releaseText.includes(date));
      });
    }

    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter((game) => {
        const tagsText = getTagsText(game);
        const diffText = game.difficulty || "";
        return selectedDifficulties.some(
          (diff) => tagsText.includes(diff) || diffText.includes(diff)
        );
      });
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((game) => {
        const ratingText = game.rating || "";
        return selectedRatings.some((r) => ratingText.includes(r));
      });
    }

    return filtered;
  };

  const filteredGames = getFilteredGames();

  const handleReset = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedArtStyles([]);
    setSelectedModes([]);
    setSelectedTags([]);
    setSelectedPlaytimes([]);
    setSelectedReleaseDates([]);
    setSelectedDifficulties([]);
    setSelectedRatings([]);
  };

  const hasActiveFilters = searchQuery.trim() !== "" || 
                          selectedGenres.length > 0 || 
                          selectedArtStyles.length > 0 || 
                          selectedModes.length > 0 || 
                          selectedTags.length > 0 || 
                          selectedPlaytimes.length > 0 || 
                          selectedReleaseDates.length > 0 || 
                          selectedDifficulties.length > 0 || 
                          selectedRatings.length > 0;

  return (
    <main className="page-container">
      <section>
        <h1 className="page-title">Find Games</h1>
        <p className="page-subtitle">
          Search by title, tags, developer, or description
        </p>
        // AI generated //
        <form
          className="search-form"
          role="search"
          aria-label="Search games"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="filter-search" className="visually-hidden">
            Search games
          </label>
          <input
            id="filter-search"
            className="search-input"
            type="search"
            placeholder="e.g. HALO, Action, Sci-Fi, Example Studio"
            aria-label="Search input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button" aria-label="Search">Search</button>
        </form>
      </section>
        // AI generated //
      <section className={`filter-section ${showFilters ? "filters-open" : ""}`}>
        <div className="filter-header">
          <button
            type="button"
            className="filter-title filter-toggle"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? "Hide Filters" : "Filter By"}
          </button>
          <span className="filter-count">
            {filteredGames.length} game
            {filteredGames.length !== 1 ? "s" : ""} found
          </span>
        </div>

        <div className="filter-list">
          <div className="filter-card" role="group" aria-labelledby="filter-genre">
            <h3 id="filter-genre" className="filter-card-title">
              Genre
            </h3>
            <div className="filter-card-body">
              {availableGenres.map((genre) => (
                <label key={genre} className="filter-checkbox-label">
                  <input type="checkbox" checked={selectedGenres.includes(genre)} onChange={() => handleGenreChange(genre)} />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-card" role="group" aria-labelledby="filter-art">
            <h3 id="filter-art" className="filter-card-title">
              Art Style
            </h3>
            <div className="filter-card-body">
              {availableArtStyles.map((style) => (
                <label key={style} className="filter-checkbox-label">
                  <input type="checkbox" checked={selectedArtStyles.includes(style)} onChange={() => handleArtStyleChange(style)} />
                  <span>{style}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-card" role="group" aria-labelledby="filter-mode">
            <h3 id="filter-mode" className="filter-card-title">
              Player Mode
            </h3>
            <div className="filter-card-body">
              {availableModes.map((mode) => (
                <label key={mode} className="filter-checkbox-label">
                  <input type="checkbox" checked={selectedModes.includes(mode)} onChange={() => handleModeChange(mode)} />
                  <span>{mode}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-card" role="group" aria-labelledby="filter-tags">
            <h3 id="filter-tags" className="filter-card-title">
              Tags / Features
            </h3>
            <div className="filter-card-body">
              {availableTags.map((tag) => (
                <label key={tag} className="filter-checkbox-label">
                  <input type="checkbox" checked={selectedTags.includes(tag)} onChange={() => handleTagChange(tag)} />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>

          <div
            className="filter-card"
            role="group"
            aria-labelledby="filter-playtime"
          >
            <h3 id="filter-playtime" className="filter-card-title">
              Playtime
            </h3>
            <div className="filter-card-body">
              {availablePlaytimes.map((time) => (
                <label key={time} className="filter-checkbox-label">
                  <input type="checkbox" checked={selectedPlaytimes.includes(time)} onChange={() => handlePlaytimeChange(time)} />
                  <span>{time}</span>
                </label>
              ))}
            </div>
          </div>

          <div
            className="filter-card"
            role="group"
            aria-labelledby="filter-release"
          >
            <h3 id="filter-release" className="filter-card-title">
              Release Date
            </h3>
            <div className="filter-card-body">
              {availableReleaseDates.map((date) => (
                <label key={date} className="filter-checkbox-label">
                  <input type="checkbox" checked={selectedReleaseDates.includes(date)} onChange={() => handleReleaseDateChange(date)} />
                  <span>{date}</span>
                </label>
              ))}
            </div>
          </div>

          <div
            className="filter-card"
            role="group"
            aria-labelledby="filter-difficulty"
          >
            <h3 id="filter-difficulty" className="filter-card-title">
              Difficulty
            </h3>
            <div className="filter-card-body">
              {availableDifficulties.map((diff) => (
                <label key={diff} className="filter-checkbox-label">
                  <input type="checkbox" checked={selectedDifficulties.includes(diff)} onChange={() => handleDifficultyChange(diff)} />
                  <span>{diff}</span>
                </label>
              ))}
            </div>
          </div>

          <div
            className="filter-card"
            role="group"
            aria-labelledby="filter-rating"
          >
            <h3 id="filter-rating" className="filter-card-title">
              Rating / Popularity
            </h3>
            <div className="filter-card-body">
              {availableRatings.map((rating) => (
                <label key={rating} className="filter-checkbox-label">
                  <input type="checkbox" checked={selectedRatings.includes(rating)} onChange={() => handleRatingChange(rating)} />
                  <span>{rating}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-actions">
          <button
            type="button"
            className="btn btn-reset"
            onClick={handleReset}
            disabled={!hasActiveFilters}
          >
            Reset All Filters
          </button>
        </div>
      </section>

      <section className="game-section">
        <div className="game-list">
          {filteredGames.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-message">
                No games found matching your criteria.
              </p>
              <p className="empty-state-hint">
                Try adjusting your filters or search terms.
              </p>
              <button className="btn btn-primary" onClick={handleReset}>
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredGames.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title || game.name}
                imageSrc={game.imageSrc}
                imageAlt={game.imageAlt}
                ratingText={
                  game.ratingText ||
                  (typeof game.averageRating === "number" ? `★ ${game.averageRating}` : "N/A")
                }
                tagsText={getTagsText(game)}
                detailPath={`/gamedetail/${game.id}`}
                downloadUrl={game.website || game.downloadUrl || "#"}
                wishlist={wishlist}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                displayTags={true}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}