const game = [
  {
    id: "halo",
    title: "HALO",
    imageSrc: "/img/halo.jpeg",
    imageAlt: "HALO cover",
    website: "https://www.xbox.com/en-US/games/halo",

    genre: "Action",
    artStyle: "Sci-Fi",
    tag: "FPS",
    playerMode: "Multiplayer",
    playTime: "Long",
    difficulty: "Normal",
    rating: "Popular",

    developer: "Bungie",
    publishDate: "2001-11-15",

    description:
      "A sci-fi FPS featuring large-scale battles, co-op campaigns, and competitive multiplayer modes.",
    averageRating: 4.5,
    userRating: null,

    comments: [
      {
        id: "c1",
        author: "User123",
        time: "2 days ago",
        text: "Really enjoyed the campaign and co-op mode.",
      },
      {
        id: "c2",
        author: "Gamer456",
        time: "1 week ago",
        text: "Multiplayer is fun, but needs more maps.",
      },
      {
        id: "c3",
        author: "NewPlayer",
        time: "3 weeks ago",
        text: "Great tutorial and amazing graphics.",
      },
    ],
  },

  {
    id: "sekiro",
    title: "Sekiro",
    imageSrc: "/img/Sekiro.jpg",
    imageAlt: "Sekiro cover",
    website: "https://www.fromsoftware.jp",

    genre: "Action",
    artStyle: "Soulslike",
    tag: "Sword Combat",
    playerMode: "Single Player",
    playTime: "Medium",
    difficulty: "Hard",
    rating: "Top Rated",

    developer: "FromSoftware",
    publishDate: "2019-03-22",

    description: "A challenging action game focused on precise sword combat and stealth.",
    averageRating: 4.9,
    userRating: null,
    comments: []
  },

  {
    id: "animal-crossing",
    title: "Animal Crossing",
    imageSrc: "/img/animalcrossing.avif",
    imageAlt: "Animal Crossing cover",
    website: "https://animalcrossing.nintendo.com/new-horizons/",

    genre: "RPG",
    artStyle: "Cute",
    tag: "Animals",
    playerMode: "Single Player",
    playTime: "Long",
    difficulty: "Easy",
    rating: "Relaxing",

    developer: "Nintendo EPD",
    publishDate: "2020-03-20",

    description: "Animal Crossing is a relaxing social simulation game.",
    averageRating: 4.8,
    userRating: null,
    comments: []
  },

  {
    id: "league-legends",
    title: "League of Legends",
    imageSrc: "/img/league.jpg",
    imageAlt: "League of Legends cover",
    website: "https://www.leagueoflegends.com/en-us/",

    genre: "MOBA",
    artStyle: "Fantasy",
    tag: "Competitive",
    playerMode: "Multiplayer",
    playTime: "Medium",
    difficulty: "Hard",
    rating: "Popular",

    developer: "Riot Games",
    publishDate: "2009-10-27",

    description: "A fast-paced competitive MMORPG-style MOBA game.",
    averageRating: 3.5,
    userRating: null,
    comments: []
  }
];

export default game;
