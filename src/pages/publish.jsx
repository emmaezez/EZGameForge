import { useState } from "react";

export default function Publish({ onPublishGame }) {
  const [gameName, setGameName] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");

  const [imageSrc, setImageSrc] = useState("");

  const [genre, setGenre] = useState("");
  const [artStyle, setArtStyle] = useState("");
  const [tag, setTag] = useState("");
  const [playerMode, setPlayerMode] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [rating, setRating] = useState("");

  const genreOptions = ["Action", "Adventure", "RPG", "Simulation", "Strategy", "Sports", "Racing", "Puzzle", "Horror", "Fighting", "Sandbox", "Others"];
  const artStyleOptions = ["Pixel / Retro", "Hand-drawn", "Realistic", "Minimalist", "Sci-Fi", "Fantasy", "Cartoon", "Historical", "Cozy", "Post-apocalyptic", "Others"];
  const tagOptions = ["Story-rich", "Open World", "Exploration", "Survival", "Crafting", "Multiplayer", "VR Compatible", "Controller Support", "Others"];
  const playerModeOptions = ["Single Player", "MMO", "PvP", "PvE", "Local Co-op", "Online Co-op", "Cross Platform", "Others"];
  const playTimeOptions = ["Short (< 5h)", "Medium (5~20h)", "Long (20~60h)", "Very Long (60+h)", "Endless / Replayable", "Others"];
  const difficultyOptions = ["Easy", "Normal", "Hard", "Hardcore", "Soulslike", "Others"];
  const ratingOptions = ["Top Rated", "Most Played", "Trending", "Award-winning", "Hidden Gems", "Others"];

  function handleSubmit(event) {
    event.preventDefault();

    let publishDate = "";
    if (year && month && day) {
      publishDate = `${year.padStart(4, "0")}-${month.padStart(
        2,
        "0"
      )}-${day.padStart(2, "0")}`;
    }

    const newGame = {
      name: gameName,
      description: desc,
      website: url,
      publishDate,
      genre,
      artStyle,
      tag,
      playerMode,
      playTime,
      difficulty,
      rating,
      imageSrc,
    };

    if (onPublishGame) {
      onPublishGame(newGame);
    }

    setGameName("");
    setMonth("");
    setDay("");
    setYear("");
    setDesc("");
    setUrl("");
    setImageSrc("");
    setGenre("");
    setArtStyle("");
    setTag("");
    setPlayerMode("");
    setPlayTime("");
    setDifficulty("");
    setRating("");
  }

  const renderSingleChoiceGroup = (label, options, selected, setter) => (
    <div className="form-field">
      <span className="form-label">{label}</span>
      <div className="publish-chip-group">
        {options.map((option) => {
          const active = selected === option;
          return (
            <button
              key={option}
              type="button"
              className={`publish-chip ${active ? "publish-chip-active" : ""}`}
              onClick={() => setter(active ? "" : option)}
              aria-pressed={active}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <main className="page-container">
      <section>
        <h1 className="page-title">Publish a Game</h1>
        <p className="page-subtitle">
          Fill in the details below and publish to GameForge.
        </p>
      </section>

      <section className="content-section">
        <form className="publish-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="game-name" className="form-label">
                Game Name
              </label>
              <input
                id="game-name"
                type="text"
                className="form-input"
                placeholder="Enter game name"
                required
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="publish-month" className="form-label">Game Publish Date</label>

              <div className="form-date-group">
                <input
                  id="publish-month"
                  type="text"
                  className="form-input-date"
                  placeholder="MM"
                  maxLength={2}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
                <span className="date-slash">/</span>
                <input
                  id="publish-day"
                  type="text"
                  className="form-input-date"
                  placeholder="DD"
                  maxLength={2}
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                />
                <span className="date-slash">/</span>
                <input
                  id="publish-year"
                  type="text"
                  className="form-input-date-year"
                  placeholder="YYYY"
                  maxLength={4}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="desc" className="form-label">
                Description
              </label>
              <textarea
                id="desc"
                rows={5}
                className="form-textarea"
                placeholder="Describe your game..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="url" className="form-label">
                Official Website / Store URL
              </label>
              <input
                id="url"
                type="url"
                className="form-input"
                placeholder="https://example.com/game"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row form-media-row">
            <div className="form-field">
              <label htmlFor="game-image" className="form-label">Image</label>

              <input
                id="game-image"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (!file) return;
                  const objectUrl = URL.createObjectURL(file);
                  setImageSrc(objectUrl);
                }}
                className="upload-input"
              />

              {imageSrc && (
                <div className="upload-preview">
                  <img
                    src={imageSrc}
                    alt="Preview"
                    className="upload-preview-image"
                  />
                </div>
              )}
            </div>

            {/* <div className="form-field">
              <label className="form-label">Video</label>
              <button type="button" className="upload-box">
                <span className="upload-plus">+</span>
                <span>Upload Video</span>
              </button>
            </div> */}
          </div>

          <div className="form-row form-select-row">
            {renderSingleChoiceGroup("Genre", genreOptions, genre, setGenre)}
            {renderSingleChoiceGroup("Art Style", artStyleOptions, artStyle, setArtStyle)}
            {renderSingleChoiceGroup("Tags / Features", tagOptions, tag, setTag)}
            {renderSingleChoiceGroup("Player Mode", playerModeOptions, playerMode, setPlayerMode)}
            {renderSingleChoiceGroup("Playtime", playTimeOptions, playTime, setPlayTime)}
            {renderSingleChoiceGroup("Difficulty", difficultyOptions, difficulty, setDifficulty)}
            {renderSingleChoiceGroup("Rating / Popularity", ratingOptions, rating, setRating)}

            {/* <div className="form-field form-field-add">
              <button type="button" className="add-button">
                +
              </button>
            </div> */}
          </div>

          <div className="form-row form-actions">
            <button type="submit" className="btn">
              Save &amp; Publish
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}