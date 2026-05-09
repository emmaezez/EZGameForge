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

  return (
    <main className="page-container">
      <section>
        <h1 className="page-title">Publish a Game</h1>
        <p className="page-subtitle">
          Fill in the details below and publish to PlayForge.
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
              <label className="form-label">Game Publish Date</label>

              <div className="form-date-group">
                <input
                  type="text"
                  className="form-input-date"
                  placeholder="MM"
                  maxLength={2}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
                <span className="date-slash">/</span>
                <input
                  type="text"
                  className="form-input-date"
                  placeholder="DD"
                  maxLength={2}
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                />
                <span className="date-slash">/</span>
                <input
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
              <label className="form-label">Image</label>

              <input
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
            <div className="form-field">
              <label className="form-label">Genre</label>
              <select
                className="select-box"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="RPG">RPG</option>
                <option value="Simulation">Simulation</option>
                <option value="Strategy">Strategy</option>
                <option value="Sports">Sports</option>
                <option value="Racing">Racing</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Horror">Horror</option>
                <option value="Fighting">Fighting</option>
                <option value="Sandbox">Sandbox</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">Art Style</label>
              <select
                className="select-box"
                value={artStyle}
                onChange={(e) => setArtStyle(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Pixel / Retro">Pixel / Retro</option>
                <option value="Hand-drawn">Hand-drawn</option>
                <option value="Realistic">Realistic</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Cartoon">Cartoon</option>
                <option value="Historical">Historical</option>
                <option value="Cozy">Cozy</option>
                <option value="Post-apocalyptic">Post-apocalyptic</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">Tags / Features</label>
              <select
                className="select-box"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Story-rich">Story-rich</option>
                <option value="Open World">Open World</option>
                <option value="Exploration">Exploration</option>
                <option value="Survival">Survival</option>
                <option value="Crafting">Crafting</option>
                <option value="Multiplayer">Multiplayer</option>
                <option value="VR Compatible">VR Compatible</option>
                <option value="Controller Support">Controller Support</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">Player Mode</label>
              <select
                className="select-box"
                value={playerMode}
                onChange={(e) => setPlayerMode(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Single Player">Single Player</option>
                <option value="MMO">MMO</option>
                <option value="PvP">PvP</option>
                <option value="PvE">PvE</option>
                <option value="Local Co-op">Local Co-op</option>
                <option value="Online Co-op">Online Co-op</option>
                <option value="Cross Platform">Cross Platform</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">Playtime</label>
              <select
                className="select-box"
                value={playTime}
                onChange={(e) => setPlayTime(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Short (< 5h)">Short (&lt; 5h)</option>
                <option value="Medium (5~20h)">Medium (5~20h)</option>
                <option value="Long (20~60h)">Long (20~60h)</option>
                <option value="Very Long (60+h)">Very Long (60+h)</option>
                <option value="Endless / Replayable">Endless / Replayable</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">Difficulty</label>
              <select
                className="select-box"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Easy">Easy</option>
                <option value="Normal">Normal</option>
                <option value="Hard">Hard</option>
                <option value="Hardcore">Hardcore</option>
                <option value="Soulslike">Soulslike</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">Rating / Popularity</label>
              <select
                className="select-box"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Top Rated">Top Rated</option>
                <option value="Most Played">Most Played</option>
                <option value="Trending">Trending</option>
                <option value="Award-winning">Award-winning</option>
                <option value="Hidden Gems">Hidden Gems</option>
                <option value="Others">Others</option>
              </select>
            </div>

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